import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    id: string;
    name: string;
    email: string;
}

class UpdateCustomerService {
    public async execute({ id, name, email }: IRequest): Promise<Customer> {
        const serviceRepository = getCustomRepository(CustomersRepository);

        const customer = await serviceRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        const verifyEmail = await serviceRepository.findByEmail(email);

        if (verifyEmail && email !== customer.email) {
            throw new AppError('E-mail adress already taken.');
        }

        customer.name = name;
        customer.email = email;

        await serviceRepository.save(customer);
        return customer;
    }
}

export default UpdateCustomerService;
