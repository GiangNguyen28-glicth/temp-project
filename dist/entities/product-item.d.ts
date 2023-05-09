/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { Domain, Status } from '../common/interfaces/enum';
import { IProductItem } from './product';
export type ProductModel = Model<ProductItem>;
export declare class ProductItem implements IProductItem {
    id?: string;
    link?: string;
    last_price?: number;
    last_sell_price?: number;
    domain?: Domain;
    status?: Status;
    price_expect?: number;
    next_crawl_time?: Date;
    count_failed?: number;
    raw_data?: string;
    crawled_date?: Date;
}
export declare const ProductSchema: import("mongoose").Schema<ProductItem, Model<ProductItem, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductItem>;
