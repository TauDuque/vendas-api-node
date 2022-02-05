import Customer from '@modules/customers/typeorm/entities/Customer';
import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';

export interface IProduct {
    product_id: string;
    price: number;
    quantity: number;
}

interface IRequest {
    customer: Customer;
    products: IProduct[];
}

@EntityRepository(Order)
class OrderRepository extends Repository<Order> {
    public async findById(id: string): Promise<Order | undefined> {
        const customer = await this.findOne(id, {
            relations: ['order_products', 'customer'],
        });
        return customer;
    }

    public async createOrder({ customer, products }: IRequest): Promise<Order> {
        const order = await this.create({
            customer,
            order_products: products,
        });

        await this.save(order);

        return order;
    }
}

export default OrderRepository;
