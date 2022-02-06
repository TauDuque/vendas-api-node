import { createQueryBuilder, getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IQuery {
    name: string;
    email: string;
}

class ShowUsersService {
    public async execute({ name, email }: IQuery): Promise<User[]> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.find();

        const query = createQueryBuilder(User, 'users');

        if (name) {
            query.andWhere('users.name = :name', { name });
        }

        if (email) {
            query.andWhere('users.email = :email', { email });
        }

        const [users] = await query.getManyAndCount();

        return users;
    }
}

export default ShowUsersService;
