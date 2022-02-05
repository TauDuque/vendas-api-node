import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { compare } from 'bcryptjs';

interface IUserProps {
    user_id: string;
    name: string;
    email: string;
    password?: string;
    old_password?: string;
}

class UpdateUserService {
    public async execute({
        user_id,
        name,
        email,
        password,
        old_password,
    }: IUserProps): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found.');
        }

        const verifyEmail = await usersRepository.findByEmail(email);

        if (verifyEmail && verifyEmail.id != user_id) {
            throw new AppError(
                'There already another user usingthis e-mail adress.',
            );
        }

        if (password && !old_password) {
            throw new AppError('Old password required.');
        }

        if (old_password && password) {
            const verifyOldPassword = await compare(
                old_password,
                user.password,
            );

            if (!verifyOldPassword) {
                throw new AppError('Password invalid.');
            }

            user.password = await hash(password, 8);
        }

        user.name = name;
        user.email = email;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserService;
