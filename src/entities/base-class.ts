// import { IRead, IWrite } from 'common/interfaces/model';
// import { MongoClient, Db, Collection, InsertOneResult } from 'mongodb';

// export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
//   public readonly _collection: Collection;

//   //we created constructor with arguments to manipulate mongodb operations
//   constructor(db: Db, collectionName: string) {
//     this._collection = db.collection(collectionName);
//   }

//   async find(item: T): Promise<T[]> {
//     throw new Error('Method not implemented.');
//   }
//   async findOne(id: string): Promise<T> {
//     throw new Error('Method not implemented.');
//   }
//   async create(item: T): Promise<boolean> {
//     const result = await this._collection.insert(item);
//     // after the insert operations, we returns only ok property (that haves a 1 or 0 results)
//     // and we convert to boolean result (0 false, 1 true)
//     return !!result.result.ok;
//   }
//   async update(id: string, item: T): Promise<boolean> {
//     throw new Error('Method not implemented.');
//   }
//   async delete(id: string): Promise<boolean> {
//     throw new Error('Method not implemented.');
//   }
// }
