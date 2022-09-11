import { Application,NextFunction,Request,Response  } from "express";
import createError from 'http-errors';

export = (app:Application) => {
    app.get('/health',  (req:Request,res:Response,next:NextFunction)=>{
        res.json({message:"API em operação"});
    })
}