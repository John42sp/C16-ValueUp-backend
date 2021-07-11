import { Exclude } from "class-transformer";
import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
class User {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    admin: boolean;

    @Exclude() //função Exclude do lib class-transformer omite envio do campo password no metodos get
    @Column()  //e no ListUserService, deve adicionar classToPlain pro Exclude aqui funcionar
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { User };