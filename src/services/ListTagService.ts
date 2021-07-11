import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories";
import { classToPlain } from "class-transformer";


class ListTagService {
    async execute(){
        const tagsRepository = getCustomRepository(TagsRepositories);
        //listar todas tags que existem
        let tags = await tagsRepository.find(); //aqui mudou de conts para let, para subscrever linha abaixo

//customizar o nome da tag com um hashtag em cada item da lista (MUDOU PARA LIB class-transformer)
        // tags =  tags.map((tag) => ({ ...tag, nameCustom: `#${tag.name}`}))
        // return tags;

//classToPlain vai dentro da Entity tag e recupera função comitem customizado(criar novos objetos a partir do objeto vindo do tags do typeorm)
        return classToPlain(tags);
    }
}

export { ListTagService }