import express, { Request, Response } from 'express';
import consign from 'consign';

export const app = express();
 
app.use(express.json());

consign({cwd:'src'}).include('routers').into(app);

