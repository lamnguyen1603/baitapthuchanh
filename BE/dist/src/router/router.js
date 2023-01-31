"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const HomeController_1 = __importDefault(require("../controller/HomeController"));
exports.router = (0, express_1.Router)();
exports.router.get('/products', HomeController_1.default.getAll);
exports.router.post('/products', HomeController_1.default.create);
exports.router.put('/products/:id', HomeController_1.default.edit);
exports.router.delete('/products/:id', HomeController_1.default.move);
exports.router.get('/products/:id', HomeController_1.default.findByIdPr);
exports.router.get('/categories', HomeController_1.default.findCategory);
//# sourceMappingURL=router.js.map