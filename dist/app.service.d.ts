import { Logger } from '@nestjs/common';
import { ProductItemDTO } from 'api/dto/product-item.dto';
import { ProductModel } from 'entities';
export declare class AppService {
    private productModel;
    private logger;
    constructor(productModel: ProductModel, logger: Logger);
    addProduct(product_dto: ProductItemDTO): Promise<boolean>;
}
