import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IUserProps {
    id: string;
    name: string;
    email: string;
    password: string;
}

class UpdateUserService {
    public async execute({
        id,
        name,
        email,
        password,
    }: IUserProps): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findById(id);

        if (!user) {
            throw new AppError('User not found.');
        }

        const hashWord = await hash(password, 8);

        user.name = name;
        user.email = email;
        user.password = hashWord;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserService;
