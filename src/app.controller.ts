import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductItemDTO } from 'api/dto/product-item.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health-check')
  healthCheck(): string {
    return 'Is Health Check';
  }

  // @Post('products')
  // async addProductItem(@Body() product_dto: ProductItemDTO): Promise<boolean> {
  //   return this.appService.addProduct(product_dto);
  // }

  @Get('non-blocking')
  nonBlocking() {
    return 'Hello';
  }

  @Get('blocking')
  blocking() {
    let count = 0;
    for (let i = 0; i < 20_000_000_000; i++) {
      count++;
    }
  }
}
