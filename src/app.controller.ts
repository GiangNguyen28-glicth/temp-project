import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductItemDTO } from 'api/dto/product-item.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('products')
  async addProductItem(@Body() product_dto: ProductItemDTO): Promise<boolean> {
    return this.appService.addProduct(product_dto);
  }
}
