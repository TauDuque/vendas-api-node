import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import GetUserService from '../services/GetUserService';
import ShowUsersService from '../services/ShowUsersService';
import UpdateUserService from '../services/UpdateUserService';
import { instanceToInstance } from 'class-transformer';
import GetUserByNameService from '../services/GetUserByNameService';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';

export default class UsersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const queryParams: any = request.query;

        const userService = new ShowUsersService();

        const users = await userService.execute(queryParams);

        return response.json(instanceToInstance(users));
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

        return response.json(instanceToInstance(user));
    }

    public async getUser(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { user_id } = request.params;

        const userService = new GetUserService();

        const user = await userService.execute({ user_id });

        return response.json(instanceToInstance(user));
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;
        const { user_id } = request.params;

        const userService = new UpdateUserService();

        const user = await userService.execute({
            user_id,
            name,
            email,
            password,
        });

        return response.json(instanceToInstance(user));
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
