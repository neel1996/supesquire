import { Server } from 'socket.io';
import { inference } from './inference';
import { save } from './saveChatRecords';

export default function handler(req, res) {
  const io = new Server(res.socket.server, {
    path: '/api/socket_io',
    addTrailingSlash: false
  });

  res.socket.server.io = io;

  io.on('connection', (socket) => {
    socket.on('message', async (data) => {
      const parsed = JSON.parse(data);

      await save({
        checksum: parsed.documentId,
        message: parsed.message,
        actor: 'human'
      }).catch((err) => {
        console.error(err);
        socket.emit('chat_error', JSON.stringify({ message: err }));
      });

      const documentData = await fetch(`${process.env.ORIGIN}/api/document`, {
        method: 'POST',
        body: JSON.stringify({
          documentId: parsed.documentId,
          message: parsed.message
        })
      })
        .then((res) => res.json())
        .catch((err) => {
          console.error(err);
          socket.emit('chat_error', JSON.stringify({ message: err }));
        });

      inference({ documentData, question: parsed.message }).then(
        async (answer) => {
          await save({
            checksum: parsed.documentId,
            message: answer,
            actor: 'ai'
          })
            .then(() => {
              socket.emit('ai_message', JSON.stringify({ message: answer }));
            })
            .catch((err) => {
              console.error(err);
              socket.emit('chat_error', JSON.stringify({ message: err }));
            });
        }
      );
    });
  });

  res.end();
}
