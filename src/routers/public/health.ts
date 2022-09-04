import { Application,Request,Response  } from "express";

export = (app:Application) => {
    app.get('/health',(req:Request,res:Response)=>{
        res.json('Tudo ok');
    })
}