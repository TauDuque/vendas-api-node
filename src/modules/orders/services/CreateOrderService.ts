import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrderRepository from '../typeorm/repositories/OrderRepository';

export interface IProduct {
    id: string;
    quantity: number;
}

interface IProductsProps {
    customer_id: string;
    products: IProduct[];
}

class CreateOrderService {
    public async execute({
        customer_id,
        products,
    }: IProductsProps): Promise<Order> {
        const ordersRepository = getCustomRepository(OrderRepository);
        const customerRepository = getCustomRepository(CustomersRepository);
        const productsRepository = getCustomRepository(ProductRepository);

        const customer = await customerRepository.findById(customer_id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        const product = await productsRepository.findAllByIds(products);

        if (!product.length) {
            throw new AppError('Product not found.');
        }

        const verifyProductsIds = product.map(product => product.id);

        const checkForUnexistentProducts = products.filter(
            product => !verifyProductsIds.includes(product.id),
        );

        if (checkForUnexistentProducts.length) {
            throw new AppError(`Product not found`);
        }

        const quantityAvailable = products.filter(
            item =>
                product.filter(p => p.id === item.id)[0].quantity <
                item.quantity,
        );

        if (quantityAvailable.length) {
            throw new AppError(
                `The quantity ${quantityAvailable[0].quantity} isn't available for this product`,
            );
        }

        const serialProducts = products.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            price: product.filter(p => p.id === item.id)[0].price,
        }));

        const order = await ordersRepository.createOrder({
            customer: customer,
            products: serialProducts,
        });

        const { order_products } = order;

        const updateProductsQuantity = order_products.map(item => ({
            id: item.product_id,
            quantity:
                product.filter(p => p.id === item.product_id)[0].quantity -
                item.quantity,
        }));

        await productsRepository.save(updateProductsQuantity);

        return order;
    }
}

export default CreateOrderService;
