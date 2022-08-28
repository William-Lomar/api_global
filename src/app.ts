import { serverMqtt } from './mqttMosca';
import { serverExpress } from './express';
import mqtt from 'mqtt';

require('dotenv').config();

serverExpress.listen(process.env.PORT_EXPRESS, () => {
    console.log(`server express running on port ${process.env.PORT_EXPRESS}`);
});  

serverMqtt.on('ready', ()=>{
    console.log(`server mqtt running on port ${process.env.PORT_MQTT}`);
})

export const clientMqtt = mqtt.connect('mqtt://localhost',{port:1884});

clientMqtt.on('connect',()=>{
    console.log("Cliente mqtt conectado");
    clientMqtt.subscribe('teste');
    clientMqtt.on('message',(topic,message,packet)=>{
        console.log("Recebi a mensagem: ",message.toString());
    })
})