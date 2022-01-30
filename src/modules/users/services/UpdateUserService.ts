import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IUserProps {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
}

class UpdateUserService {
    public async execute({
        id,
        name,
        email,
        password,
        avatar,
    }: IUserProps): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findById(id);
        // const repeated = await usersRepository.findByEmail(email);

        // if (repeated) {
        //     throw new AppError('E-mail already taken.');
        // }

        if (!user) {
            throw new AppError('User not found.');
        }
        user.name = name;
        user.email = email;
        user.password = password;
        user.avatar = avatar;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserService;
