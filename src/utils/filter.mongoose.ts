import { SortOrder } from 'mongoose';
import { transformTextSearch } from './utils';
import { BuildQuery, QueryOperator } from 'common/interfaces/common';
export type SortQuery = { [key: string]: SortOrder };

export class FilterBuilder<T> {
  queryFilter: any = {
    $and: [],
  };

  querySort: SortQuery = {};
  setFilterItem(key: keyof T, query: QueryOperator, value: any) {
    if (!key || !value) return this;
    const subQuery = {
      [key]: { [query]: value },
    };
    this.queryFilter['$and'].push(subQuery);
    return this;
  }

  addName(name: string) {
    name = name?.toLowerCase()?.trim();
    // If search text is empty, limit to using regex
    if (!name) return this;
    this.setFilterItemWithObject(
      'keyword',
      {
        $regex: `${transformTextSearch(name)}`,
        $options: 'i',
      },
      name,
    );
    return this;
  }

  setFilterItemWithObject(key: string, query: any, value: any) {
    this.setFilterItem(key as keyof T, query, value);
    return this;
  }

  setSortItem(key: keyof T, value: SortOrder) {
    if (!value) {
      return this;
    }
    this.querySort[key as any] = value;
    return this;
  }

  private addSubQuery(query: object) {
    if (query) this.queryFilter['$and'].push(query);
    return this;
  }

  buildQuery(): BuildQuery {
    if (!this.queryFilter?.$and?.length)
      return {
        filter: this.queryFilter,
        sort: this.querySort,
      };
    return {
      filter: this.queryFilter,
      sort: this.querySort,
    };
  }
}
