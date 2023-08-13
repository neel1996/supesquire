import { Server } from 'socket.io';

export default function handler(req, res) {
  const io = new Server(res.socket.server, {
    path: '/api/socket_io',
    addTrailingSlash: false
  });

  res.socket.server.io = io;

  res.end();
}
