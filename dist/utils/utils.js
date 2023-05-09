"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextProxy = exports.getNextCrawlTime = exports.transformTextSearch = exports.toKeyword = exports.toSlug = void 0;
const enum_1 = require("../common/interfaces/enum");
const slugify_1 = __importDefault(require("slugify"));
function toSlug(text, locale) {
    if (!text)
        return '';
    text = text.replace('$', '').replace('%', '');
    locale = locale ? locale : enum_1.Language.EN;
    return (0, slugify_1.default)(text, {
        replacement: '-',
        lower: true,
        strict: true,
        locale: locale,
        trim: true,
    });
}
exports.toSlug = toSlug;
function toKeyword(text) {
    if (!text)
        return '';
    return text.replace(/-/g, ' ');
}
exports.toKeyword = toKeyword;
function transformTextSearch(text) {
    if (!text)
        return '';
    text = text.replace('$', '').replace('%', '');
    text = (0, slugify_1.default)(text, {
        replacement: '-',
        lower: true,
        strict: true,
        trim: true,
    });
    return text.replace(/-/g, ' ');
}
exports.transformTextSearch = transformTextSearch;
function getNextCrawlTime(rangeTime = 900) {
    const addTime = rangeTime;
    const now = new Date();
    return new Date(now.getTime() + addTime);
}
exports.getNextCrawlTime = getNextCrawlTime;
function nextProxy(current_index, proxies) {
    current_index++;
    if (current_index >= proxies.length) {
        current_index = 0;
    }
    const proxy = proxies[current_index];
    return proxy;
}
exports.nextProxy = nextProxy;
//# sourceMappingURL=utils.js.map