//inicio aula 5 / interface nativa em nodo_modules
//sobescrevendo interface nativa 'Request' com var user_id, sendo usada no file 'ensureAuthenticated.ts'

declare namespace Express {
    export interface Request {
      user_id: string;
    }
  }