import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AppService {
  private notificationSubject: Subject<string> = new Subject<string>();

  sendNotification(message: string) {
    this.notificationSubject.next(message);
  }

  getNotificationStream(): Observable<string> {
    return this.notificationSubject.asObservable();
  }
  // constructor(
  //   @InjectModel(ProductItem.name) private productModel: ProductModel,
  //   private logger: Logger,
  // ) {}

  // async addProduct(product_dto: ProductItemDTO): Promise<boolean> {
  //   try {
  //     const product = await this.productModel.create(product_dto);
  //     if (!product) {
  //       this.logger.debug('Insert failed');
  //     }
  //     this.logger.debug(`Insert ${product.id} success`);
  //     return true;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
