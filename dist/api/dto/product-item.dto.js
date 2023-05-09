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
exports.ProductItemDTO = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class ProductItemDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, link: { required: true, type: () => String }, domain: { required: true, enum: require("../../common/interfaces/enum").Domain }, status: { required: true, enum: require("../../common/interfaces/enum").Status }, price_expect: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Link',
    }),
    __metadata("design:type", String)
], ProductItemDTO.prototype, "link", void 0);
exports.ProductItemDTO = ProductItemDTO;
//# sourceMappingURL=product-item.dto.js.map