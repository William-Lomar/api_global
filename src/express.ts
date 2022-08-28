import express, { json } from 'express';
import consign from 'consign';
import helmet from 'helmet';
import cors from 'cors';

export const serverExpress = express();
 
serverExpress.use(express.json());
serverExpress.use(helmet());
serverExpress.use(cors());
serverExpress.use(json());

consign({cwd:'src'}).include('routers').into(serverExpress);

