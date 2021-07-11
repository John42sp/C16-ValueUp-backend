import 'reflect-metadata';
import express, { NextFunction, Request, response, Response } from 'express';
import 'express-async-errors';

import './database'; //não presisa definir database/index.ts, ele ja sabe
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);

//ao invez de colocar try catch em cada bloco no controller, fazer uma unica tratativa no server com middleware
//middleware de erros = precisa passar 4 parametros, aoinvez de fazer Try Catch no controller, so depois das rotas!!!
//yarn add express-async-errors
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error) { //se for erro do tipo Error, definido no service (throw Error)
        return response.status(400).json({
            error: err.message, //vai atirar "User already exists", definido no CreateUserServices
        });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error",
    })
})

// app.get("/test", (request, response) => {
//     return response.send("Ola NLW")
// })

// app.post("/test-post", (request, response) => {
//     return response.send("Ola, testando 1º post")
// })


app.listen(3000, () => console.log("Server os running on port 3000!"))