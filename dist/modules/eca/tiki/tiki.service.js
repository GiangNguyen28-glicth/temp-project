"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TikiService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const common_2 = require("../../../common");
const utils_1 = require("../../../utils");
const scraper_1 = require("../../../scraper");
const mapping_1 = require("../../../mapping");
const entities_1 = require("../../../entities");
const mail_service_1 = require("../../mail/mail.service");
let TikiService = class TikiService {
    constructor(productModel, scraper, logger, mailService) {
        this.productModel = productModel;
        this.scraper = scraper;
        this.logger = logger;
        this.mailService = mailService;
        this.product_item_buffer = [];
        this.proxy_index = 0;
        this.proxies = [];
    }
    async onModuleInit() {
        await this.findAll();
        await this.crawlProductItem();
        this.showInfo();
    }
    filter() {
        return {
            next_crawl_time: new Date(),
            domain: common_2.Domain.TIKI,
            status: common_2.Status.IDLE,
        };
    }
    async findAll() {
        const { MAX_PRODUCT_ITEM_BUFFER, DELAY_REQUEST_TO_DATABASE } = common_2.COMMON_CONFIG;
        if (this.product_item_buffer.length > MAX_PRODUCT_ITEM_BUFFER) {
            setTimeout(this.findAll.bind(this), DELAY_REQUEST_TO_DATABASE);
        }
        const filter = this.filter();
        const query = new utils_1.FilterBuilder()
            .setFilterItem('domain', '$eq', filter.domain)
            .setFilterItem('status', '$eq', filter.status)
            .setFilterItem('next_crawl_time', '$lte', filter.next_crawl_time.toISOString())
            .setSortItem('next_crawl_time', 'asc')
            .buildQuery();
        const products = await this.productModel
            .find(query.filter)
            .sort(query.sort);
        await Promise.all(products.map(item => {
            item.status = common_2.Status.UPDATING;
            return item.save();
        }));
        this.product_item_buffer = this.product_item_buffer.concat(products);
        setTimeout(this.findAll.bind(this), DELAY_REQUEST_TO_DATABASE);
    }
    async crawlProductItem() {
        const { DELAY_REQUEST_TO_DOMAIN, DELAY_CRAWL_CONTENT } = common_2.COMMON_CONFIG;
        try {
            if (this.product_item_buffer.length === 0) {
                this.logger.debug('Buffer has no product item');
                setTimeout(this.crawlProductItem.bind(this), DELAY_CRAWL_CONTENT.PI_DETAIL);
                return;
            }
            const product_item = this.product_item_buffer.splice(0, 1)[0];
            const url_request = this.buildUrlRequest(product_item.link);
            const data = await this.scraper.requestWithGetMethod(url_request);
            const new_entities = (0, mapping_1.mappingDataTikiPI)(data);
            this.updatingNextCrawlTime(new_entities);
            await this.productModel.findOneAndUpdate({ id: product_item.id }, new_entities);
            if (new_entities.last_sell_price < product_item.price_expect) {
                this.logger.log('Start sent info to mail');
                await this.mailService.sendMail(process.env.TO_EMAIL, 'NOTIFICATION_TIKI', new_entities.link);
            }
            setTimeout(this.crawlProductItem.bind(this), DELAY_REQUEST_TO_DOMAIN);
        }
        catch (error) {
            this.logger.error(error);
            setTimeout(this.crawlProductItem.bind(this), DELAY_CRAWL_CONTENT.PI_DETAIL);
        }
    }
    getParamId(link) {
        if (!link) {
            return null;
        }
        const tikiMatched = link.match(/-p(\d+)\.html\?spid=(\d+)/);
        if (tikiMatched) {
            return { pid: tikiMatched[1], spid: tikiMatched[2] };
        }
        return null;
    }
    buildUrlRequest(link) {
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
    updatingNextCrawlTime(entities) {
        const { NEXT_CRAWL_TIME } = common_2.COMMON_CONFIG;
        entities.next_crawl_time = (0, utils_1.getNextCrawlTime)(NEXT_CRAWL_TIME.TIKI_PI_DETAIL);
        entities.status = common_2.Status.IDLE;
    }
};
TikiService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(entities_1.ProductItem.name)),
    __metadata("design:paramtypes", [Object, scraper_1.Scraper,
        common_1.Logger,
        mail_service_1.MailService])
], TikiService);
exports.TikiService = TikiService;
//# sourceMappingURL=tiki.service.js.map