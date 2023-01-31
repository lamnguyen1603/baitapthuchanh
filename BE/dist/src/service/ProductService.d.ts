declare class ProductService {
    private productRepository;
    constructor();
    getAll: () => Promise<any>;
    save: (product: any) => Promise<any>;
    findById: (id: any) => Promise<any>;
    update: (id: any, newProduct: any) => Promise<any>;
    moveProduct: (id: any) => Promise<any>;
    findByName: (search: any) => Promise<any>;
}
declare const _default: ProductService;
export default _default;
