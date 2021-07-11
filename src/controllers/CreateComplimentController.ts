import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";

class CreateComplimentController {
  async handle(request: Request, response: Response) {
    // const { tag_id, user_receiver, user_sender, message } = request.body; 
    const { tag_id, user_receiver,  message } = request.body; //user_sender virá do request = user logado

    const { user_id } = request;

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      tag_id,
      user_sender: user_id,  //user_sender será usuario autenticado, cuja info estara dentro do token
      user_receiver,
      message,
    });

    return response.json(compliment);
  }
}

export { CreateComplimentController };