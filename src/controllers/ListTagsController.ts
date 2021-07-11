import { Request, Response } from "express";
import { ListTagService } from "../services/ListTagService";


class ListTagsController {
    async handle(request: Request, response:Response) {
//aqui apenas chamando o método execute criado no service, pra retornar todas tags existentes.
        const listTagService = new ListTagService();

        const tags = await listTagService.execute();
        
        return response.json(tags); 
    }
}

export { ListTagsController }