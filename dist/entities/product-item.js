"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = exports.ProductItem = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const enum_1 = require("../common/interfaces/enum");
let ProductItem = class ProductItem {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ProductItem.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ProductItem.prototype, "link", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ProductItem.prototype, "last_price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], ProductItem.prototype, "last_sell_price", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: Object.values(enum_1.Domain),
        type: String,
    }),
    __metadata("design:type", String)
], ProductItem.prototype, "domain", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: Object.values(enum_1.Status),
        type: String,
    }),
    __metadata("design:type", String)
], ProductItem.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ProductItem.prototype, "price_expect", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: new Date() }),
    __metadata("design:type", Date)
], ProductItem.prototype, "next_crawl_time", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ProductItem.prototype, "count_failed", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ProductItem.prototype, "raw_data", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], ProductItem.prototype, "crawled_date", void 0);
ProductItem = __decorate([
    (0, mongoose_1.Schema)()
], ProductItem);
exports.ProductItem = ProductItem;
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(ProductItem);
//# sourceMappingURL=product-item.js.map