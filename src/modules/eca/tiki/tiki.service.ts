import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { COMMON_CONFIG, Domain, FilterProductItem, Status } from 'common';
import { FilterBuilder, getNextCrawlTime } from 'utils';
import { Scraper } from 'scraper';
import { mappingDataTikiPI } from 'mapping';
import { ProductItem, ProductModel } from 'entities';
import { MailService } from 'modules/mail/mail.service';

@Injectable()
export class TikiService implements OnModuleInit {
  constructor(
    @InjectModel(ProductItem.name) private productModel: ProductModel,
    private scraper: Scraper,
    private logger: Logger,
    private mailService: MailService,
  ) {}
  product_item_buffer: ProductItem[] = [];
  proxy_index = 0;
  proxies: string[] = [];

  async onModuleInit() {
    await this.findAll();
    await this.crawlProductItem();
    this.showInfo();
  }

  filter(): Partial<FilterProductItem> {
    return {
      next_crawl_time: new Date(),
      domain: Domain.TIKI,
      status: Status.IDLE,
    };
  }

  async findAll(): Promise<void> {
    const { MAX_PRODUCT_ITEM_BUFFER, DELAY_REQUEST_TO_DATABASE } =
      COMMON_CONFIG;
    if (this.product_item_buffer.length > MAX_PRODUCT_ITEM_BUFFER) {
      setTimeout(this.findAll.bind(this), DELAY_REQUEST_TO_DATABASE);
    }
    const filter = this.filter();
    const query = new FilterBuilder<ProductItem>()
      .setFilterItem('domain', '$eq', filter.domain)
      .setFilterItem('status', '$eq', filter.status)
      .setFilterItem(
        'next_crawl_time',
        '$lte',
        filter.next_crawl_time.toISOString(),
      )
      .setSortItem('next_crawl_time', 'asc')
      .buildQuery();
    const products = await this.productModel
      .find(query.filter)
      .sort(query.sort);
    await Promise.all(
      products.map(item => {
        item.status = Status.UPDATING;
        return item.save();
      }),
    );
    this.product_item_buffer = this.product_item_buffer.concat(products);
    setTimeout(this.findAll.bind(this), DELAY_REQUEST_TO_DATABASE);
  }

  async crawlProductItem() {
    const { DELAY_REQUEST_TO_DOMAIN, DELAY_CRAWL_CONTENT } = COMMON_CONFIG;
    try {
      if (this.product_item_buffer.length === 0) {
        this.logger.debug('Buffer has no product item');
        setTimeout(
          this.crawlProductItem.bind(this),
          DELAY_CRAWL_CONTENT.PI_DETAIL,
        );
        return;
      }
      const product_item = this.product_item_buffer.splice(0, 1)[0];
      const url_request = this.buildUrlRequest(product_item.link);
      const data = await this.scraper.requestWithGetMethod(url_request);
      const new_entities = mappingDataTikiPI(data);
      this.updatingNextCrawlTime(new_entities);
      await this.productModel.findOneAndUpdate(
        { id: product_item.id },
        new_entities,
      );
      if (new_entities.last_sell_price < product_item.price_expect) {
        this.logger.log('Start sent info to mail');
        await this.mailService.sendMail(
          process.env.TO_EMAIL,
          'NOTIFICATION_TIKI',
          new_entities.link,
        );
      }
      setTimeout(this.crawlProductItem.bind(this), DELAY_REQUEST_TO_DOMAIN);
    } catch (error) {
      this.logger.error(error);
      setTimeout(
        this.crawlProductItem.bind(this),
        DELAY_CRAWL_CONTENT.PI_DETAIL,
      );
    }
  }

  getParamId(link: string) {
    if (!link) {
      return null;
    }
    const tikiMatched = link.match(/-p(\d+)\.html\?spid=(\d+)/);
    if (tikiMatched) {
      return { pid: tikiMatched[1], spid: tikiMatched[2] };
    }
    return null;
  }

  buildUrlRequest(link: string) {
    const { pid, spid } = this.getParamId(link);
    if (pid && spid) {
      return `https://tiki.vn/api/v2/products/${pid}?platform=web&spid=${spid}`;
    }
    return link;
  }

  showInfo() {
    this.logger.debug(`Current buffer: ${this.product_item_buffer.length}`);
    setTimeout(this.showInfo.bind(this), 30000);
  }

  updatingNextCrawlTime(entities: ProductItem): void {
    const { NEXT_CRAWL_TIME } = COMMON_CONFIG;
    entities.next_crawl_time = getNextCrawlTime(NEXT_CRAWL_TIME.TIKI_PI_DETAIL);
    entities.status = Status.IDLE;
  }
}
