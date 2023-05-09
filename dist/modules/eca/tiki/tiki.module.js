"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TikiModule = void 0;
const common_1 = require("@nestjs/common");
const tiki_service_1 = require("./tiki.service");
const mongoose_1 = require("@nestjs/mongoose");
const scraper_1 = require("../../../scraper");
const entities_1 = require("../../../entities");
const mail_module_1 = require("../../mail/mail.module");
let TikiModule = class TikiModule {
};
TikiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: entities_1.ProductItem.name, schema: entities_1.ProductSchema },
            ]),
            mail_module_1.MailModule,
        ],
        providers: [tiki_service_1.TikiService, common_1.Logger, scraper_1.Scraper],
    })
], TikiModule);
exports.TikiModule = TikiModule;
//# sourceMappingURL=tiki.module.js.map