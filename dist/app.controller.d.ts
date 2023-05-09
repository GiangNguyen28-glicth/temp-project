import { AppService } from './app.service';
import { ProductItemDTO } from 'api/dto/product-item.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    healthCheck(): string;
    addProductItem(product_dto: ProductItemDTO): Promise<boolean>;
}
