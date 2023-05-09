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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const entities_1 = require("./entities");
let AppService = class AppService {
    constructor(productModel, logger) {
        this.productModel = productModel;
        this.logger = logger;
    }
    async addProduct(product_dto) {
        try {
            const product = await this.productModel.create(product_dto);
            if (!product) {
                this.logger.debug('Insert failed');
            }
            this.logger.debug(`Insert ${product.id} success`);
            return true;
        }
        catch (error) {
            throw error;
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(entities_1.ProductItem.name)),
    __metadata("design:paramtypes", [Object, common_1.Logger])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map