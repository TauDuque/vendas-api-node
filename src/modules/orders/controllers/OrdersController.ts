import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';
import ShowOrderService from '../services/ShowOrderService';

export default class OrdersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const ordersService = new ShowOrderService();

        const orders = await ordersService.execute({ id });

        return response.json(orders);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { customer_id, products } = request.body;
        const orderService = new CreateOrderService();

        const order = await orderService.execute({
            customer_id,
            products,
        });

        return response.json(order);
    }
}
