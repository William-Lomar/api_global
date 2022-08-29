import ws from 'ws';
require('dotenv').config();

export const serverWss = new ws.WebSocketServer({
    port:Number(process.env.PORT_WEB_SOCKET)
})

