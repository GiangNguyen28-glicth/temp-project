import { Domain } from 'common/interfaces/enum';
import { ProductItem } from 'entities';
import * as _ from 'lodash';
export function mappingDataTikiPI(data: any): ProductItem {
  let link: string = _.get(data, 'url_path', null);
  if (link) {
    link = `https://${Domain.TIKI}/${link}`;
  }
  const pi: ProductItem = {
    link,
    last_sell_price: _.get(data, 'price', null),
    last_price: _.get(data, 'original_price', null),
    // raw_data: JSON.stringify(data),
  };
  return pi;
}
