"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductService_1 = __importDefault(require("../service/ProductService"));
const CategoryService_1 = __importDefault(require("../service/CategoryService"));
class HomeController {
    constructor() {
        this.getAll = async (req, res) => {
            try {
                let products = await ProductService_1.default.getAll();
                res.status(200).json(products);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.create = async (req, res) => {
            try {
                let products = await ProductService_1.default.save(req.body);
                res.status(200).json(products);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.edit = async (req, res) => {
            try {
                let id = req.params.id;
                let products = await this.productService.update(id, req.body);
                res.status(200).json(products);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.move = async (req, res) => {
            try {
                let id = req.params.id;
                let products = await this.productService.moveProduct(id);
                res.status(200).json(products);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.findByIdPr = async (req, res) => {
            try {
                let id = req.params.id;
                let product = await ProductService_1.default.findById(id);
                res.status(200).json(product);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.findCategory = async (req, res) => {
            try {
                let categories = await CategoryService_1.default.getAll();
                res.status(200).json(categories);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.productService = ProductService_1.default;
        this.categoryService = CategoryService_1.default;
    }
}
exports.default = new HomeController();
//# sourceMappingURL=HomeController.js.map