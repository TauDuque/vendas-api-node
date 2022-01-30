import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IProductsProps {
    email: string;
    password: string;
}

interface IToken {
    user: User;
    token: string;
}

class CreateSessionService {
    public async execute({ email, password }: IProductsProps): Promise<IToken> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect e-mail/password.', 401);
        }

        const passwordConfirmed = await compare(password, user.password);

        if (!passwordConfirmed) {
            throw new AppError('Incorrect e-mail/password.', 401);
        }

        const token = sign({}, '8e93c0130e0ff8a6ceaba4ff626a23c9', {
            subject: user.id,
            expiresIn: '1d',
        });

        return {
            user,
            token,
        };
    }
}

export default CreateSessionService;
