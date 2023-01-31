import {Product} from "../model/product";
import {AppDataSource} from "../data-source";

class ProductService {
    private productRepository
    constructor() {
        this.productRepository =  AppDataSource.getRepository(Product)
    }
    getAll = async () => {
        let sql = `select p.id, p.name, p.price, p.image, c.id as idCategory, c.name as nameCategory from product p join category c on p.category = c.id`
        let products = await this.productRepository.query(sql);
        // console.log(products)
        return products
    }
    save = async (product) => {
        return this.productRepository.save(product)
    }
    findById = async (id)=> {
        let products = await this.productRepository.findOneBy({id :id})
        return products
    }

     update = async (id,newProduct) => {
        let products = await this.productRepository.findOneBy({id :id})
        if(!products) {
            return null
        }
        return await this.productRepository.update({id : id},newProduct)
    }
    moveProduct = async (id) => {
        let product = await this.productRepository.findOneBy({id : id});
        if(!product){
            return null
        }
        return this.productRepository.delete({id : id});
    }
    findByName = async (search)=> {
        // console.log(search)
        let products = await this.productRepository.find({name:{$regex:`(.*)${search.search}(.*)`}});
        // console.log(products)
        if(!products){
            return null;
        }
        return products;
    }
}

export default new ProductService();