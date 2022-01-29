import CreateProductService from '@modules/products/services/CreateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import GetProductService from '@modules/products/services/GetProduct';
import ShowProductsService from '@modules/products/services/ShowProductsService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import { Request, Response } from 'express';

export default class ProductsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const productService = new ShowProductsService();

        const products = await productService.execute();
        return response.json(products);
    }

    public async getProduct(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const productService = new GetProductService();

        const product = await productService.execute({ id });

        return response.json(product);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, price, quantity } = request.body;

        const productService = new CreateProductService();

        const product = await productService.execute({ name, price, quantity });

        return response.json(product);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id, name, price, quantity } = request.body;

        const productService = new UpdateProductService();

        const product = await productService.execute({
            id,
            name,
            price,
            quantity,
        });

        return response.json(product);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const productService = new DeleteProductService();

        await productService.execute({ id });

        return response.json('Product sucefully deleted.');
    }
}
