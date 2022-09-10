import { Application,NextFunction,Request,Response  } from "express";
import createError from 'http-errors';

export = (app:Application) => {
    app.get('/public/health',  (req:Request,res:Response,next:NextFunction)=>{
        console.log("Acesso a rota health");
        
        return next(createError(500,"Testando criação de Erros")) 
    })
}