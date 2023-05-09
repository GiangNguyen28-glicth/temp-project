"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scraper = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let Scraper = class Scraper {
    constructor() {
        this.headers = {};
    }
    async requestWithGetMethod(url_request) {
        const response = axios_1.default.get(url_request, {
            headers: this.headers,
        });
        return (await response).data;
    }
    setHeaders(key, value) {
        this.headers[key] = value;
    }
};
Scraper = __decorate([
    (0, common_1.Injectable)()
], Scraper);
exports.Scraper = Scraper;
//# sourceMappingURL=scraper.js.map