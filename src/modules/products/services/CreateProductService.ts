import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';

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

        const redisCache = new RedisCache();

        const product = productsRepository.create({
            name,
            price,
            quantity,
        });

        await redisCache.invalidate('api-vendas-PRODUCTS_LIST');

        await productsRepository.save(product);

        return product;
    }
}

export default CreateProductService;
