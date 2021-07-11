import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"


class ListUserReceiveComplimentsService {
    async execute(user_id: string){
        const complimentsRepository = getCustomRepository(ComplimentsRepositories);
        //listar do ComplimentsRepositories todos compliments recebidos pelo usuario (com mesmo user_id)
        const compliments = complimentsRepository.find({
            where: {
                user_receiver: user_id, //prop 'user_receiver' esta definida no entity Compliments.ts
            },                      //aqui traz apenas o compliment portador do user id tal
            relations: [ "userSender","userReceiver","tag"]//tbm trazer obj inteiro c/ todas infos
        })
        return compliments;
    }
}

export { ListUserReceiveComplimentsService }