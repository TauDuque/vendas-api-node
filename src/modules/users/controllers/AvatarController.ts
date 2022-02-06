import { Request, Response } from 'express';
import AvatarUpdateService from '../services/AvatarUpdateService';
import { instanceToInstance } from 'class-transformer';
export default class AvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const avatarService = new AvatarUpdateService();

        const avatar = avatarService.execute({
            userId: request.user.id,
            avatarFileName: request.file?.filename as string,
        });

        return response.json(instanceToInstance(avatar));
    }
}
