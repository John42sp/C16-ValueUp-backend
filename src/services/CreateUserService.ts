import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";

//user service vai instruir user controllero que fazer com info recebida no controller, onde req.body, req.query, etc
interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}
class CreateUserService {
//ambos na User migr Table e service: admin padrão false = ai não precisa mais informar admin false insomnia
    async execute({ name, email, admin = false, password }: IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);

        if(!email) {
            throw new Error("Email incorrect");
        }

        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if(userAlreadyExists) {
            throw new Error("User already exists");
        }
//criptografar senha
        const passwordHash = await hash(password, 8)//passar params senha e valor salt = 8

        const user = usersRepository.create({
            name,
            email,
            admin,
            password: passwordHash, //enviando senha criptografada
        })
//antes de criar/salvar senha no repositorio,vamos criptografar ela
        await usersRepository.save(user);

        return user;
    }

}

export { CreateUserService };