import { Domain, Status } from '../common/interfaces/enum';
export class IProductItem {
  id?: string;
  link?: string;
  last_price?: number;
  last_sell_price?: number;
  domain?: Domain;
  status?: Status;
  price_expect?: number;
  next_crawl_time?: Date;
  count_failed?: number;
  raw_data?: string;
  crawled_date?: Date;
}
