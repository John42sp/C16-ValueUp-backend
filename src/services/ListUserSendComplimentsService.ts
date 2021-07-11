import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"


class ListUserSendComplimentsService {
    async execute(user_id: string){
        const complimentsRepository = getCustomRepository(ComplimentsRepositories);
        //listar do ComplimentsRepositories todos compliments enviados pelo usuario (com mesmo user_id)

        const compliments = complimentsRepository.find({
            where: {              // //prop 'user_sender' esta definida no entity Compliments.ts
                user_sender: user_id, //user_id é o que esta logado, no controller virá do 'request'
            },                          //aqui traz apenas o compliment portador do user id tal
            relations: [ "userSender","userReceiver","tag"]//tbm trazer obj inteiro c/ todas infos
        })
        return compliments;
    }
}

export { ListUserSendComplimentsService }