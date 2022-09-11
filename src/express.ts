import  createError  from 'http-errors';
import { Response, NextFunction , Request} from 'express';
import express, { json } from 'express';
const consign = require('consign');
require('dotenv').config();

import helmet from 'helmet';
import cors from 'cors';

const LOGIN = process.env.LOGIN;

export const serverExpress = express();
 
serverExpress.use(helmet());
serverExpress.use(cors());
serverExpress.use(json());

serverExpress.use('/private/*',(req:Request, res:Response, next:NextFunction)=>{
    let login = req.header('login');
    if(login == LOGIN){
      next();
    }else{
      next(createError(HTTP_ERRORS.ACESSO_NAO_AUTORIZADO,'login incorreto ao acessar rota privada')) ;
    }
})

consign({cwd:'src'}).include('routers').into(serverExpress);

serverExpress.use((error:any, req:Request, res:Response, next:NextFunction) => {
  // Seta o HTTP Status Code
  res.status(error.status)
  // Envia a resposta
  res.json({ message: error.message })
})

export enum HTTP_ERRORS{
  ACESSO_NAO_AUTORIZADO = 401,
  ROTA_NAO_ENCONTRADA = 404,
  ERRO_INTERNO = 500, //Erro não mapeado
  ERRO_API_EXTERNA = 403 //Erro ao realizar uma solicitação externa
}