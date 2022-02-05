import AppError from '@shared/errors/AppError';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    id: string;
}

class GetCustomerByIdService {
    public async index({ id }: IRequest): Promise<Customer> {
        const customerRepository = new CustomersRepository();

        const customer = await customerRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        return customer;
    }
}

export default GetCustomerByIdService;
