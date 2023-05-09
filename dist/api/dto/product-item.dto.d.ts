import { Domain, Status } from 'common/interfaces/enum';
import { IProductItem } from 'entities/product';
export declare class ProductItemDTO implements Partial<IProductItem> {
    id: string;
    link: string;
    domain: Domain;
    status: Status;
    price_expect: number;
}
