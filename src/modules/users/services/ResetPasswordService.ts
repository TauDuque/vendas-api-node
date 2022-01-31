import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

interface IProps {
    token: string;
    password: string;
}

class ResetPasswordService {
    public async execute({ token, password }: IProps): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const userToken = await userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('Invalid token.');
        }

        const user = await usersRepository.findById(userToken.userId);

        if (!user) {
            throw new AppError('User not found.');
        }

        const tokenCreation = userToken.created_at;
        const compareTokenDates = addHours(tokenCreation, 2);

        if (isAfter(Date.now(), compareTokenDates)) {
            throw new AppError('Token expired.');
        }

        user.password = await hash(password, 8);

        await usersRepository.save(user);
    }
}

export default ResetPasswordService;
