import { Logger, OnModuleInit } from '@nestjs/common';
import { ProductItem, ProductModel } from '../../../entities';
import { FilterProductItem } from 'common/interfaces/common';
import { Scraper } from 'scraper/scraper';
import { MailService } from 'module/mail/mail.service';
export declare class TikiService implements OnModuleInit {
    private productModel;
    private scraper;
    private logger;
    private mailService;
    constructor(productModel: ProductModel, scraper: Scraper, logger: Logger, mailService: MailService);
    product_item_buffer: ProductItem[];
    onModuleInit(): Promise<void>;
    filter(): Partial<FilterProductItem>;
    findAll(): Promise<void>;
    crawlProductItem(): Promise<void>;
    getParamId(link: string): {
        pid: string;
        spid: string;
    };
    buildUrlRequest(link: string): string;
    showInfo(): void;
    updatingNextCrawlTime(entities: ProductItem): void;
}
