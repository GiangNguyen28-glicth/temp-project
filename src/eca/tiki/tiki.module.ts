import { Logger, Module } from '@nestjs/common';
import { TikiService } from './tiki.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductItem, ProductSchema } from '../../entities/product-item';
import { Scraper } from 'scraper/scraper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductItem.name, schema: ProductSchema },
    ]),
  ],
  providers: [TikiService, Logger, Scraper],
})
export class TikiModule {}
