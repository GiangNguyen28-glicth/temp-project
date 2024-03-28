import { Injectable } from '@nestjs/common';
import { ICRUD } from 'common/interfaces/crud';

@Injectable()
export class CrudImplV2 implements ICRUD {
  findOne() {
    console.log('CrudImplV2 FindOne');
  }
  findAll() {
    throw new Error('Method not implemented.');
  }
  create() {
    throw new Error('Method not implemented.');
  }
  update() {
    throw new Error('Method not implemented.');
  }
}

export const CrudImplV2Provider = {
  provide: 'CRUD_IMLV2',
  useClass: CrudImplV2,
};
