"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../model/product");
const data_source_1 = require("../data-source");
class ProductService {
    constructor() {
        this.getAll = async () => {
            let sql = `select p.id, p.name, p.price, p.image, c.id as idCategory, c.name as nameCategory from product p join category c on p.category = c.id`;
            let products = await this.productRepository.query(sql);
            return products;
        };
        this.save = async (product) => {
            return this.productRepository.save(product);
        };
        this.findById = async (id) => {
            let products = await this.productRepository.findOneBy({ id: id });
            return products;
        };
        this.update = async (id, newProduct) => {
            let products = await this.productRepository.findOneBy({ id: id });
            if (!products) {
                return null;
            }
            return await this.productRepository.update({ id: id }, newProduct);
        };
        this.moveProduct = async (id) => {
            let product = await this.productRepository.findOneBy({ id: id });
            if (!product) {
                return null;
            }
            return this.productRepository.delete({ id: id });
        };
        this.findByName = async (search) => {
            let products = await this.productRepository.find({ name: { $regex: `(.*)${search.search}(.*)` } });
            if (!products) {
                return null;
            }
            return products;
        };
        this.productRepository = data_source_1.AppDataSource.getRepository(product_1.Product);
    }
}
exports.default = new ProductService();
//# sourceMappingURL=ProductService.js.map