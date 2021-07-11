import { Request, Response } from "express";
import { ListUserReceiveComplimentsService } from "../services/ListUserReceiveComplimentsService";


class ListUserReceiveComplimentsController {
    async handle(request: Request, response:Response) {

        const { user_id } = request;

        const listUserReceiveComplimentsService = new ListUserReceiveComplimentsService();
        //pra usuario recuperar ambas listas, presisa esta logado, e logado te user_id vindodo 'request'
        const compliments = await listUserReceiveComplimentsService.execute(user_id);
         //trara os compliments 'where' user_receiver = user_id no service 
        return response.json(compliments); //lista de todos compliments recebidos pelo usuario logado
    }
}

export { ListUserReceiveComplimentsController }