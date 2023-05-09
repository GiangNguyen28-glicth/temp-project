"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterBuilder = void 0;
const utils_1 = require("./utils");
class FilterBuilder {
    constructor() {
        this.queryFilter = {
            $and: [],
        };
        this.querySort = {};
    }
    setFilterItem(key, query, value) {
        if (!key || !value)
            return this;
        const subQuery = {
            [key]: { [query]: value },
        };
        this.queryFilter['$and'].push(subQuery);
        return this;
    }
    addName(name) {
        var _a;
        name = (_a = name === null || name === void 0 ? void 0 : name.toLowerCase()) === null || _a === void 0 ? void 0 : _a.trim();
        if (!name)
            return this;
        this.setFilterItemWithObject('keyword', {
            $regex: `${(0, utils_1.transformTextSearch)(name)}`,
            $options: 'i',
        }, name);
        return this;
    }
    setFilterItemWithObject(key, query, value) {
        this.setFilterItem(key, query, value);
        return this;
    }
    setSortItem(key, value) {
        if (!value) {
            return this;
        }
        this.querySort[key] = value;
        return this;
    }
    addSubQuery(query) {
        if (query)
            this.queryFilter['$and'].push(query);
        return this;
    }
    buildQuery() {
        var _a, _b;
        if (!((_b = (_a = this.queryFilter) === null || _a === void 0 ? void 0 : _a.$and) === null || _b === void 0 ? void 0 : _b.length))
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
exports.FilterBuilder = FilterBuilder;
//# sourceMappingURL=filter.mongoose.js.map