import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import path from 'path';
import fs from 'fs';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';

interface IAvatarProps {
    avatarFileName: string;
    userId: string;
}

class AvatarUpdateService {
    public async execute({
        avatarFileName,
        userId,
    }: IAvatarProps): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(userId);

        if (!user) {
            throw new AppError('User not found');
        }

        if (user.avatar) {
            const userAvatarPath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            const userAvatarExists = await fs.promises.stat(userAvatarPath);
            if (userAvatarExists) {
                await fs.promises.unlink(userAvatarPath);
            }
        }
        user.avatar = avatarFileName;
        await usersRepository.save(user);
        return user;
    }
}

export default AvatarUpdateService;
