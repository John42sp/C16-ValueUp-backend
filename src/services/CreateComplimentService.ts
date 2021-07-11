import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {
  async execute({
    tag_id,
    user_sender, 
    user_receiver,
    message,
  }: IComplimentRequest) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );
    const usersRepositories = getCustomRepository(UsersRepositories);
        //validação: distinguir user sender de receiver
    if (user_sender === user_receiver) {
      throw new Error("Incorrect User Receiver");
    }
//ATENÇÃO: O user sender já está autenticado pra enviar o elogio, entao necessário validar o user_receiver
    const userReceiverExists = await usersRepositories.findOne(user_receiver);
    //2ª validação: user receiver existe?
    if (!userReceiverExists) {
      throw new Error("User Receiver does not exists!");
    }
    //aqui os dados abaixoserão preenchidos pelo req.body no Compliment controller
    const compliment = complimentsRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message,
    });
    //finalmente salvando no banco e retornando o elogio
    await complimentsRepositories.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };