import express, { json } from 'express';
import consign from 'consign';
import helmet from 'helmet';
import cors from 'cors';

export const app = express();
 
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(json());

consign({cwd:'src'}).include('routers').into(app);

