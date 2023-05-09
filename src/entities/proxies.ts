import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Model } from 'mongoose';

export type ProxyModel = Model<Proxy>;

@Schema()
export class Proxy {
  @Transform(({ value }) => value.toString())
  _id: string;
  @Prop()
  proxy: string;
  @Prop()
  username: string;
  @Prop()
  password: string;
}

export const ProxySchema = SchemaFactory.createForClass(Proxy);
