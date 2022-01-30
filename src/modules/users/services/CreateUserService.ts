import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IProductsProps {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({
        name,
        email,
        password,
    }: IProductsProps): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const userExist = await usersRepository.findByEmail(email);
        if (userExist) {
            throw new AppError('E-mail already used.');
        }

        const hashWord = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashWord,
        });
        await usersRepository.save(user);
        return user;
    }
}

export default CreateUserService;
