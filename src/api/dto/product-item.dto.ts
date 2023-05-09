import { Domain, Status } from 'common/interfaces/enum';
import { IProductItem } from 'entities/product';
import { ApiProperty } from '@nestjs/swagger';

export class ProductItemDTO implements Partial<IProductItem> {
  id: string;
  @ApiProperty({
    description: 'Link',
  })
  link: string;
  domain: Domain;
  status: Status;
  price_expect: number;
}
