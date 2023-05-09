"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_config_1 = require("./config/mongoose.config");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const entities_1 = require("./entities");
const modules_1 = require("./modules");
const mail_module_1 = require("./modules/mail/mail.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            modules_1.TikiModule,
            mail_module_1.MailModule,
            mongoose_1.MongooseModule.forRootAsync({
                useClass: mongoose_config_1.MongooseConfigService,
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: entities_1.ProductItem.name, schema: entities_1.ProductSchema },
            ]),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            schedule_1.ScheduleModule.forRoot(),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, common_1.Logger],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map