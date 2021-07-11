import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";
//CRIAR SENHA CRIPTOGRAFADA
//foi esquecido de criar coluna 'senha' no table 'users', então esta tabela apenas cria 'coluna senha' e junta esta à tabela user. isNulable:true pra colocar valor NULL onde coluna senha estiver vazio= users criado antes de ter criado esta TableColum 'password'
//nao foi esquecido  de colocar campo password na entity User, a qual serve pra ambos table User e table 
//esta

//entitie user pode receber key 'password' , apenas table user e password ficam separados
//adicionou 'password' no CreateUserService e no CreateUserController

//no UserService, antes de criar/salvar senha no repositorio,vamos criptografar ela

// installar libs: yarn add jsonwebtoken @types/jsonwebtoken -D  bryptjs @types/bryptjs -D

//CRIAR ROTA PRA AUTENTICAÇÃO DO USER, PRA PODER LOGAR: AuthenticateUserService.ts

//criar controllerAuthenticateUserController.ts

export class AlterUserAddPassword1625169996296 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "password",
                type: "varchar",
                isNullable: true 
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "password") //apagar coluna: 1º param qual table, 2º a coluna
    }

}
