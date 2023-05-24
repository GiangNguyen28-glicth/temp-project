import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/mongoose.config';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductItem, ProductSchema } from 'entities';
import { TikiModule } from 'modules';
import { MailModule } from 'modules/mail/mail.module';

@Module({
  imports: [
    // TikiModule,
    // MailModule,
    // MongooseModule.forRootAsync({
    //   useClass: MongooseConfigService,
    // }),
    // MongooseModule.forFeature([
    //   { name: ProductItem.name, schema: ProductSchema },
    // ]),
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }),
    // ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
