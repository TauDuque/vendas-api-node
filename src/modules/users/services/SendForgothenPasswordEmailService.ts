import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';

interface IProps {
    email: string;
}

class SendForgothenPasswordEmailService {
    public async execute({ email }: IProps): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User not found.');
        }

        const userToken = await userTokensRepository.generate(user.id);

        const forgothenTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'forgothen_password.hbs',
        );

        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: 'Recuperação da senha',
            templateData: {
                file: forgothenTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3000/reset_password?token=${userToken?.token}`,
                },
            },
        });
    }
}

export default SendForgothenPasswordEmailService;
