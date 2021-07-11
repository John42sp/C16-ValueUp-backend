import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Expose } from "class-transformer";

@Entity("tags")
class Tag {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({ name: "name_custom" }) //colocando atributo nameCustom
    nameCustom(): string {     //criando função colocar hashtag e prop name desta entity
        return `#${this.name}`;
    }

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { Tag };