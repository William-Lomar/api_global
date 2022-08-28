import mosca from 'mosca';
require('dotenv').config();

export const serverMqtt = new mosca.Server({port:Number(process.env.PORT_MQTT)});
