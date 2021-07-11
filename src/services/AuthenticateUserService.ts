import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

import { compare } from 'bcryptjs';
import { sign } from "jsonwebtoken"; //gerar o token caso passwordMatch for true

//rota responsavel por autenticar user: com elementos do user entity aqui p autenticar user
//pra user efetuar login, usara 'email' e 'senha'  
//service = apenas regra de negocio (o que fazer). O AuthenticateUserController capta os valores e executa

interface IAuthenticateRequest {
    email: string;    
    password: string;
}

class AuthenticateUserService {

    async execute({email, password}: IAuthenticateRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);

        const user = await usersRepository.findOne({ //var user pega do userRepo todas props: password, etc
            email
        });
        //verificar se email (user) existe
        if(!user) {
            throw new Error("Email/Password incorrect.");
        }
        
        //verificar se senha esta correta

        //1º atributo:s de senha q user lançou no login, 2º hash (armazenada no sistema) do userRepo
        //vai retornar um boleano, se for correta retorna true
       const passwordMatch = await compare(password, user.password); //compare retorna promise, precisa await
        if(!passwordMatch) {
            throw new Error("Email/Password incorrect.")
        }
    
        //gerar token: se passwordMatch for true

        //sign retorna somente string, não precisa await. 
        const token = sign({     
            email: user.email,  //1º param: espera receber payload = user.email
        }, "PrivateKey",{//2º param: privatekey: boa pratica criar uma string longa e lançar no hashgenerator
                            //como num md5hashgenerator.com = segurança maior
            subject: user.id, //3º param: info que quero enviar
            expiresIn: "1d"   
            }
        );     
        

        return token;
    }

}

export { AuthenticateUserService };