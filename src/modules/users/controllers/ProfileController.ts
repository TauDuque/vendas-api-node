import { Request, Response } from 'express';
import GetUserService from '../services/GetUserService';
import UpdateUserService from '../services/UpdateUserService';
import { instanceToInstance } from 'class-transformer';

export default class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const showProfile = new GetUserService();
        const user_id = request.user.id;

        const profile = await showProfile.execute({ user_id });

        return response.json(instanceToInstance(profile));
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const { name, email, password, old_password } = request.body;

        const profileService = new UpdateUserService();

        const profile = await profileService.execute({
            user_id,
            name,
            email,
            password,
            old_password,
        });
        return response.json(instanceToInstance(profile));
    }
}
