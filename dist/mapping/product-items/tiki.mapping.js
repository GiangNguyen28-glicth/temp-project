"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mappingDataTikiPI = void 0;
const enum_1 = require("../../common/interfaces/enum");
const _ = __importStar(require("lodash"));
function mappingDataTikiPI(data) {
    let link = _.get(data, 'url_path', null);
    if (link) {
        link = `https://${enum_1.Domain.TIKI}/${link}`;
    }
    const pi = {
        link,
        last_sell_price: _.get(data, 'price', null),
        last_price: _.get(data, 'original_price', null),
    };
    return pi;
}
exports.mappingDataTikiPI = mappingDataTikiPI;
//# sourceMappingURL=tiki.mapping.js.map