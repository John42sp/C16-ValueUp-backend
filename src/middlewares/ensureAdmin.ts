//middleware usada nas rotas pra validar se user logado  é admin
//Request foi reformatado para user_id no index.d.ts e passado a ele o valor user_id no AuthenticatesUserServ
//então o request contem o user_id
import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";


export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {

    const { user_id } = request;
    // console.log(user_id) //aqui retorna user_id, que saberá se prop admin é true ou false

    //verificar se é admin 

    const usersRepository = getCustomRepository(UsersRepositories);

    // const user = await usersRepository.findOne(user_id);
    // console.log(user);

    //   const user = await usersRepository.findOne(user_id)
    const { admin } = await usersRepository.findOne(user_id); //desestruturando se admin true ou false!

    // const admin = true;   

    if(admin) {
        return next();
    }

    return response.status(401).json({
        error: "Unauthorized. User is not admin",
    })
}

// import { Request, Response, NextFunction } from "express";
// import { UsersRepositories } from "../repositories/UsersRepositories";
// import { getCustomRepository } from "typeorm";

// export async function ensureAdmin(
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) {
//   const { user_id } = request;

//   const usersRepositories = getCustomRepository(UsersRepositories);

//   const { admin } = await usersRepositories.findOne(user_id);
//   console.log(admin)

//   // Verificar se usuario admin

//   if (admin) {
//     return next();
//   }

//   return response.status(401).json({
//     error: "Unauthorized",
//   });
// }