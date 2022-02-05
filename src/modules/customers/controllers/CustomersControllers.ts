import { Request, Response } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';
import GetCustomerByIdService from '../services/GetCustomerByIdService';
import ShowCustomersService from '../services/ShowCustomersService';
import UpdateCustomerService from '../services/UpdateCustomerService';

export default class CustomersController {
    public async show(request: Request, response: Response): Promise<Response> {
        const customersService = new ShowCustomersService();

        const customers = await customersService.execute();
        return response.json(customers);
    }

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const customersService = new GetCustomerByIdService();

        const customers = await customersService.execute({ id });

        return response.json(customers);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email } = request.body;

        const customersService = new CreateCustomerService();

        const customers = await customersService.execute({ name, email });

        return response.json(customers);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email } = request.body;
        const { id } = request.params;
        const customersService = new UpdateCustomerService();

        const customers = await customersService.execute({
            id,
            name,
            email,
        });

        return response.json(customers);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const customersService = new DeleteCustomerService();

        await customersService.execute({ id });

        return response.json('Customer successfully deleted.');
    }
}
