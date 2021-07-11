//camadas por ordem de chamada
// -> server --> routes --> controller --> services --> repo....

//regra de negocio (create user) no service, mas recebe valores do req.body pelo controller

import { Request,  Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {

    async handle(request: Request, response: Response) {
        //1ª forma de fazer tratativa de erro, no controller
        // try {
        //     const { name, email, admin } = request.body;

        //     const createUserService = new CreateUserService();

        //     const user = await createUserService.execute({ name, email, admin });

        //     return response.json(user);

        // } catch (err) {

        //     return response.status(400).json({ error: err.message }) ;
        // }

        //2ª forma de trataiva de erro, no server = um middlewares(interceptadores dentro de uma requisição) das rotas

        const { name, email, admin, password } = request.body; 

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({ name, email, admin, password });

        return response.json(user);
    }
}

export { CreateUserController }