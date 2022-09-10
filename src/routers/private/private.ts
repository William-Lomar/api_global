import { Application, NextFunction ,Request,Response} from "express";

export = (app:Application)=>{
    app.get('/private/home',(req:Request,res:Response,next:NextFunction)=>{
        console.log('Aqui será uma rota privada');
        res.json({message:'Acesso liberado!'})

    })
}