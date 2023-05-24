import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductItemDTO } from 'api/dto/product-item.dto';
import { ProductItem, ProductModel } from 'entities';

@Injectable()
export class AppService {
  // constructor(
  //   @InjectModel(ProductItem.name) private productModel: ProductModel,
  //   private logger: Logger,
  // ) {}

  // async addProduct(product_dto: ProductItemDTO): Promise<boolean> {
  //   try {
  //     const product = await this.productModel.create(product_dto);
  //     if (!product) {
  //       this.logger.debug('Insert failed');
  //     }
  //     this.logger.debug(`Insert ${product.id} success`);
  //     return true;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
