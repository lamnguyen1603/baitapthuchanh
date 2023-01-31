import productService from "../service/ProductService";
import categoryService from "../service/CategoryService";
import {Request, Response} from "express";

class HomeController {
    private productService;
    private categoryService;

    constructor() {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    getAll = async (req: Request, res: Response) => {
        try {
            let products = await productService.getAll();
            res.status(200).json(products)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }
    create = async (req: Request, res: Response) => {
        try {
            let products = await productService.save(req.body);
            res.status(200).json(products)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }
    edit = async (req: Request, res: Response) => {
        try {
            let id = req.params.id
            let products = await this.productService.update(id, req.body);
            res.status(200).json(products)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }
    move = async (req: Request, res: Response) => {
        try {
            let id = req.params.id
            let products = await this.productService.moveProduct(id);
            res.status(200).json(products)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }
    findByIdPr = async (req: Request, res: Response) => {
        try {
            let id = req.params.id
            let product = await productService.findById(id);
            res.status(200).json(product)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    findCategory = async (req: Request, res: Response) => {
        try {
            let categories= await categoryService.getAll();
            res.status(200).json(categories)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }


}

export default new HomeController();
