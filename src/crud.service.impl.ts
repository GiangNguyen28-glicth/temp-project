import { Injectable } from '@nestjs/common';
import { ICRUD } from 'common/interfaces/crud';

@Injectable()
export class CrudImpl implements ICRUD {
  findOne() {
    console.log('CrudImpl FindOne');
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

export const CrudImplProvider = {
  provide: 'CRUD_IML',
  useClass: CrudImpl,
};
