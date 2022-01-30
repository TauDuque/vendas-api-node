import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import GetUserService from '../services/GetUserService';
import ShowUsersService from '../services/ShowUsersService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const userService = new ShowUsersService();

        const users = await userService.execute();

        return response.json(users);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;
        const userService = new CreateUserService();

        const user = await userService.execute({
            name,
            email,
            password,
        });

        return response.json(user);
    }

    public async getUser(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const userService = new GetUserService();

        const user = await userService.execute({ id });

        return response.json(user);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password, avatar } = request.body;
        const { id } = request.params;

        const userService = new UpdateUserService();

        const user = await userService.execute({
            id,
            name,
            email,
            password,
            avatar,
        });

        return response.json(user);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const userService = new DeleteUserService();

        await userService.execute({ id });

        return response.json('User successfully deleted.');
    }
}
