import { Server } from 'socket.io';
import { inference } from './inference';

export default function handler(req, res) {
  const io = new Server(res.socket.server, {
    path: '/api/socket_io',
    addTrailingSlash: false
  });

  res.socket.server.io = io;

  io.on('connection', (socket) => {
    socket.on('message', async (data) => {
      const parsed = JSON.parse(data);

      const res = await fetch(`${process.env.ORIGIN}/api/document`, {
        method: 'POST',
        body: JSON.stringify({
          documentId: parsed.documentId,
          message: parsed.message
        })
      });

      const documentData = await res.json();

      inference({ documentData, question: parsed.message }).then((answer) => {
        socket.emit('ai_message', JSON.stringify({ message: answer }));
      });
    });
  });

  res.end();
}
