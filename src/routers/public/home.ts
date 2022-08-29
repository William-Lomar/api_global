import { serverWss } from './../../websocket';
import { clientMqtt } from './../../app';
import { Application, Request , Response} from "express";
import { WebSocket } from 'ws';

export = (app:Application) =>{
    app.get('/', (req: Request, res: Response) => {
        let message = <string>req.query.message;
        clientMqtt.publish('teste',message,()=>{
          console.log("Mensagem publicada!");
        });
        res.json({ message: 'hello world with Typescript' })
      })

      app.get('/ws', (req: Request, res: Response) => {
        serverWss.clients.forEach((client)=>{
          if (client.readyState === WebSocket.OPEN) {
            client.send('Testando envio de dados para o cliente conectado ao web socket');
          }
        })  

        res.json({ message: 'Enviei uma msg ao cliente conectado no web socket!' })
      })
}

