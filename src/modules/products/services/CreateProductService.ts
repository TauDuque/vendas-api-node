import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IProductsProps {
    name: string;
    price: number;
    quantity: number;
}

class CreateProductService {
    public async execute({
        name,
        price,
        quantity,
    }: IProductsProps): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);
        const productExist = await productsRepository.findByName(name);
        if (productExist) {
            throw new AppError('This product already created.');
        }
        const product = productsRepository.create({
            name,
            price,
            quantity,
        });
        await productsRepository.save(product);
        return product;
    }
}

export default CreateProductService;
