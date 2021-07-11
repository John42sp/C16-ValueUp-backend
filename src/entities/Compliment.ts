import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
  } from "typeorm";
  import { v4 as uuid } from "uuid";
  import { Tag } from "./Tags";
  import { User } from "./User";
  
  @Entity("compliments")
  class Compliment {
    @PrimaryColumn()
    readonly id: string;
  
    @Column()
    user_sender: string;
  
    //muitos elogios pra um User sender
    @JoinColumn({ name: "user_sender" })
    @ManyToOne(() => User)
    userSender: User; //userSender no relations no services, p/ refer User e trazer obj inteiro
  
    @Column()
    user_receiver: string;

    //muitos elogios pra um User receiver
    @JoinColumn({ name: "user_receiver" })
    @ManyToOne(() => User)
    userReceiver: User;//userSender no relations no services, p/ refer User e trazer obj inteiro
  
    @Column()
    tag_id: string;  //tag_id é mesmo que name tag_id abaixo. Numa busca aqui traz somente id
  
    //muitos elogios pra uma tag
    @JoinColumn({ name: "tag_id" })  //aula 4, 1hr: adicionando relacionamento pra estas colunas
    @ManyToOne(() => Tag)           //aqui numa busca o tag traz todas infos do entity tag
    tag: Tag;  //tag no relations no services, p/ refer entity Tag e trazer obj inteiro
  
    @Column()
    message: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    constructor() {
      if (!this.id) {
        this.id = uuid();
      }
    }
  }
  
  export { Compliment };