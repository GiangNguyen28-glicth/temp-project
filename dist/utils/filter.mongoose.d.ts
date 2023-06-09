import { SortOrder } from 'mongoose';
export type SortQuery = {
    [key: string]: SortOrder;
};
export type BuildQuery = {
    filter: Object;
    sort: SortQuery;
};
export type QueryOperator = '$eq' | '$gte' | '$lte';
export declare class FilterBuilder<T> {
    queryFilter: any;
    querySort: SortQuery;
    setFilterItem(key: keyof T, query: QueryOperator, value: any): this;
    addName(name: string): this;
    setFilterItemWithObject(key: string, query: any, value: any): this;
    setSortItem(key: keyof T, value: SortOrder): this;
    private addSubQuery;
    buildQuery(): BuildQuery;
}
