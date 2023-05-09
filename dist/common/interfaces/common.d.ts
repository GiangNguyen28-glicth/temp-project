import { IProductItem } from 'entities/product';
import { SortQuery } from 'utils/filter.mongoose';
export type FilterProductItem = Omit<IProductItem, 'id' | 'raw_data' | 'count_failed' | 'last_price' | 'last_sell_price'>;
export type QueryOperator = '$eq' | '$gte' | '$lte';
export type BuildQuery = {
    filter: Object;
    sort: SortQuery;
};
