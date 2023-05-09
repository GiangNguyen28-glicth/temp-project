import { Logger, Module } from '@nestjs/common';
import { TikiService } from './tiki.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Scraper } from 'scraper';
import { ProductItem, ProductSchema, ProxySchema } from 'entities';
import { MailModule } from 'modules/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductItem.name, schema: ProductSchema },
      { name: Proxy.name, schema: ProxySchema },
    ]),
    MailModule,
  ],
  providers: [TikiService, Logger, Scraper],
})
export class TikiModule {}
