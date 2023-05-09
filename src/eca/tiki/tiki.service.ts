import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductItem, ProductModel } from '../../entities';
import { Domain, Status } from 'common/interfaces/enum';
import { FilterBuilder } from 'utils/filter.mongoose';
import { FilterProductItem } from 'common/interfaces/common';
import { COMMON_CONFIG } from 'common/interfaces/const';
import { Scraper } from 'scraper/scraper';

@Injectable()
export class TikiService implements OnModuleInit {
  constructor(
    @InjectModel(ProductItem.name) private productModel: ProductModel,
    private scraper: Scraper,
    private logger: Logger,
  ) {}
  product_item_buffer: ProductItem[] = [];

  async onModuleInit() {
    await this.findAll();
    await this.crawlProductItem();
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
      .setFilterItem('next_crawl_time', '$lte', filter.next_crawl_time)
      .setSortItem('next_crawl_time', 'asc')
      .buildQuery();
    const products = await this.productModel
      .find(query.filter)
      .sort(query.sort);
    this.product_item_buffer.concat(products);
    setTimeout(this.findAll.bind(this), DELAY_REQUEST_TO_DATABASE);
  }

  crawlProductItem() {
    if (this.product_item_buffer.length === 0) {
      this.logger.log('Buffer has no product item');
    }
    const { DELAY_REQUEST_TO_DOMAIN } = COMMON_CONFIG;
    const product_item = this.product_item_buffer.splice(0, 1);
    const url_request = this.buildUrlRequest(product_item[0].link);
    this.logger.debug('Called when the current second is 45');
    setTimeout(this.crawlProductItem.bind(this), DELAY_REQUEST_TO_DOMAIN);
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
}
