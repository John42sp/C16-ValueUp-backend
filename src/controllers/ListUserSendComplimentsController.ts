import { Request, Response } from "express";
import { ListUserSendComplimentsService } from "../services/ListUserSendComplimentsService";


class ListUserSendComplimentsController {
    async handle(request: Request, response:Response) {

        const { user_id } = request;

        const listUserSendComplimentsService = new ListUserSendComplimentsService();
        //pra usuario recuperar ambas listas, presisa esta logado, e logado te user_id vindodo 'request'
        const compliments = await listUserSendComplimentsService.execute(user_id);
        //trara os compliments 'where' user_sender = user_id no service 
        return response.json(compliments); //lista de todos compliments enviados pelo usuario logado
    }
}

export { ListUserSendComplimentsController }