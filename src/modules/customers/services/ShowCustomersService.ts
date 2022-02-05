import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

class ShowCustomersService {
    public async execute(): Promise<Customer[]> {
        const customerRepository = new CustomersRepository();

        const customers = await customerRepository.find();

        return customers;
    }
}

export default ShowCustomersService;
