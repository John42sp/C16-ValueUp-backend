
//camadas por ordem de chamada
// -> server --> routes --> controller --> services --> repo....

//regra de negocio (create user) no service, mas recebe valores do req.body pelo controller

//CRIAR ROTA PRA FAZER LOGIN DO USER

import { Request,  Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {

    async handle(request: Request, response: Response) {

        const { email, password } = request.body;

        const authenticateUserService = new AuthenticateUserService();

        const token = await authenticateUserService.execute({ email, password });
// console.log(token)
        return response.json(token);
    }
}

export { AuthenticateUserController };