import { serverWss } from './websocket';
import { serverMqtt } from './mqttMosca';
import { serverExpress } from './express';
import mqtt from 'mqtt';

require('dotenv').config();

const serverExpressOn = serverExpress.listen(process.env.PORT_EXPRESS, () => {
    console.log(`server express running on port ${process.env.PORT_EXPRESS}`);
});  

serverMqtt.on('ready', ()=>{
    console.log(`server mqtt running on port ${process.env.PORT_MQTT}`);
})

serverWss.on('listening',()=>{
    console.log(`server web socket running on port 8080`);
})

//Ações do web socket
serverWss.on('connection',(ws)=>{
    console.log('Algum cliente foi conectado ao meu webservice!');
    
    ws.on('message',(data,isBinary)=>{
        console.log("Recebido uma mensagem no meu server web socket: ",data.toString());
    })
})


//Ações do mqtt
export const clientMqtt = mqtt.connect('mqtt://localhost',{port:1884});

clientMqtt.on('connect',()=>{
    console.log("Cliente mqtt conectado");
    clientMqtt.subscribe('teste');
    clientMqtt.on('message',(topic,message,packet)=>{
        console.log("Recebi a mensagem: ",message.toString());
    })
})




/** 
* O sinal SIGTERM é um sinal genérico usado para causar o 
término do programa *. Ao contrário do SIGKILL , este sinal pode ser bloqueado, 
* manipulado e ignorado. É a maneira normal de pedir educadamente que um 
programa * termine. O comando shell kill gera 
* SIGTERM por padrão. 
*/ 
process.on('SIGTERM', () => { 
    serverExpressOn.close(() => { 
        console.log('Servidor Fechado: Processo Finalizado!'); 
    }); 
});


