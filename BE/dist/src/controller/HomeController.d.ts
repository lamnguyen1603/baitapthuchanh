import { Request, Response } from "express";
declare class HomeController {
    private productService;
    private categoryService;
    constructor();
    getAll: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    edit: (req: Request, res: Response) => Promise<void>;
    move: (req: Request, res: Response) => Promise<void>;
    findByIdPr: (req: Request, res: Response) => Promise<void>;
    findCategory: (req: Request, res: Response) => Promise<void>;
}
declare const _default: HomeController;
export default _default;
