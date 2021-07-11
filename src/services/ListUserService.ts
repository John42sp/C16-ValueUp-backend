import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories";
import { classToPlain } from 'class-transformer';

class ListUserService {
    async execute(){
        const usersRepository = getCustomRepository(UsersRepositories);
        //listar todas users que existem
        const users = await usersRepository.find(); 
        // return users
        return classToPlain(users); //pro Excluse() no User entity funcionar
    }
}

export { ListUserService }