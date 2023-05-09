import { IProductItem } from 'entities/product';
import { SortQuery } from 'utils/filter.mongoose';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type FilterProductItem = Omit<
  IProductItem,
  'id' | 'raw_data' | 'count_failed' | 'last_price' | 'last_sell_price'
>;

export type QueryOperator = '$eq' | '$gte' | '$lte';

export type BuildQuery = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  filter: Object;
  sort: SortQuery;
};
