//AULA 5: INICIO
//middleware usada nas rotas pra 'recuperar infos do user'. User já estava logado 

import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Receber o token
  const authToken = request.headers.authorization;
//   console.log(authToken)

  // Validar se token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }

      // Validar se token é válido
//authToken é Bearer + espaço + jdkdkdkd. Split separa pelo " ",tornando em array c/ 2 strings
    //   const token  = authToken.split(" "); 
    //   console.log(token)  //aqui o token traz: 'Bearer jfjfjfjfjfjjf'

    const [, token] = authToken.split(" "); //como retorna array, assim ignora 1º item com ','
      // console.log(token)        //aqui o token traz somente o que precisa: 'jfjfjfjfjfjjf'  

//bloco try/catch: se token for invalido,vai cair direto no catch
  try {                     
    // Validar se token é válido
    const { sub } = verify(   //sub vem no token = id do user do token  
      token,
      "PrivateKey"
    ) as IPayload; //pra forçar que sub deixe de ser uma função, sendo apenas string
    // Recuperar informações do usuário
    request.user_id = sub;  //var user_id criada / subscrita no aquivo criado index.d.ts 
                            //quando cria arquivo pra subscrever, alterar tsconfig.json, linha "typeRoots" 
    return next();          //sub esparava uma função, user_id é string
                            //poderiamos tbm recuperar outras infos do user, por enquanto souser_id
  } catch (err) {
    return response.status(401).end();
  }

}