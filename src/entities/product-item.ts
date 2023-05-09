import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Domain, Status } from '../common/interfaces/enum';
import { IProductItem } from './product';
export type ProductModel = Model<ProductItem>;
@Schema()
export class ProductItem implements IProductItem {
  @Prop()
  id?: string;

  @Prop()
  link?: string;

  @Prop()
  last_price?: number;

  @Prop({ type: Number })
  last_sell_price?: number;

  @Prop({
    enum: Object.values(Domain),
    type: String,
  })
  domain?: Domain;

  @Prop({
    enum: Object.values(Status),
    type: String,
  })
  status?: Status;

  @Prop()
  price_expect?: number;

  @Prop({ default: new Date() })
  next_crawl_time?: Date;

  @Prop()
  count_failed?: number;

  @Prop()
  raw_data?: string;

  @Prop()
  crawled_date?: Date;
}
export const ProductSchema = SchemaFactory.createForClass(ProductItem);
