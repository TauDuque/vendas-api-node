import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';

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

        // console.log('userToken', userToken);
        await EtherealMail.sendMail({
            to: email,
            body: `Solicitação de redefinição de senha recebida: ${userToken?.token}`,
        });
    }
}

export default SendForgothenPasswordEmailService;
