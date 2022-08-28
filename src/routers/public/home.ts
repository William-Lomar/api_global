import { clientMqtt } from './../../app';
import { Application, Request , Response} from "express"

export = (app:Application) =>{
    app.get('/', (req: Request, res: Response) => {
        let message = <string>req.query.message;
        clientMqtt.publish('teste',message,()=>{
          console.log("Mensagem publicada!");
        });
        res.json({ message: 'hello world with Typescript' })
      })
}

