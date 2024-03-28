import {
  Body,
  Controller,
  Get,
  Header,
  Inject,
  Post,
  Req,
  Res,
  Sse,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ProductItemDTO } from 'api/dto/product-item.dto';
import { Observable, interval, map } from 'rxjs';
import { join } from 'path';
import { readFileSync } from 'fs';
import { Response } from 'express';
import { ICRUD } from 'common/interfaces/crud';
import { CrudImpl } from 'crud.service.impl';
import axios from 'axios';
import { google } from 'googleapis';

interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('CRUD_IML') private crudService: ICRUD,
    @Inject('CRUD_IMLV2') private crudServiceV2: ICRUD,
  ) {}

  @Get('health-check')
  healthCheck(): string {
    return 'Is Health Check v2';
  }

  @Get('crud')
  crud(): string {
    this.crudService.findOne();
    this.crudServiceV2.findOne();
    return 'Is Health Check';
  }

  // @Post('products')
  // async addProductItem(@Body() product_dto: ProductItemDTO): Promise<boolean> {
  //   return this.appService.addProduct(product_dto);
  // }

  @Get('non-blocking')
  nonBlocking() {
    this.appService.sendNotification('OK');
  }

  @Get('blocking')
  blocking() {
    let count = 0;
    for (let i = 0; i < 20_000_000_000; i++) {
      count++;
    }
  }

  @Get('sse')
  sse(@Res() res: Response): any {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();
    const notifications$ = this.appService.getNotificationStream();

    notifications$.subscribe(notification => {
      console.log('Notification', notification);
      res.write(`data: ${JSON.stringify(notification)}\n\n`);
    });
    // return interval(1000).pipe(map(_ => ({ data: { hello: 'world' } })));
  }

  @Get()
  index(@Res() response: Response) {
    response
      .type('text/html')
      .send(readFileSync(join(__dirname, 'index.html')).toString());
  }

  @Get('oauth2callback')
  async googleAuth(@Req() req) {
    console.log(req);
    return true;
  }
}
