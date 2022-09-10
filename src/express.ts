import { NextFunction } from 'express';
import express, { json } from 'express';
const consign = require('consign');

import helmet from 'helmet';
import cors from 'cors';

export const serverExpress = express();
 
serverExpress.use(express.json());
serverExpress.use(helmet());
serverExpress.use(cors());
serverExpress.use(json());

consign({cwd:'src'}).include('routers').into(serverExpress);

serverExpress.use((error:any, req:any, res:any, next:any) => {
  // Seta o HTTP Status Code
  res.status(error.status)
  // Envia a resposta
  res.json({ message: error.message })
})