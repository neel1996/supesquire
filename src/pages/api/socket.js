import { Server } from 'socket.io';
import { inference } from './inference';
import { createClient } from '@supabase/supabase-js';

export default function handler(req, res) {
  const io = new Server(res.socket.server, {
    path: '/api/socket_io',
    addTrailingSlash: false
  });

  res.socket.server.io = io;

  const supabase = supabaseClient(req);
  if (!supabase) {
    res.end();
  }

  io.on('connection', (socket) => {
    socket.on('message', async (data) => {
      const parsed = JSON.parse(data);
      const { message, documentId } = parsed;

      await saveChat(socket, supabase, {
        message,
        checksum: documentId,
        actor: 'human'
      });

      const documentData = {
        documentId: parsed.documentId,
        message: parsed.message,
        content: parsed.content
      };

      inference({ documentData, question: parsed.message }).then(
        async (answer) => {
          await saveChat(socket, supabase, {
            message: answer,
            checksum: documentId,
            actor: 'ai'
          });
          socket.emit('ai_message', JSON.stringify({ message: answer }));
        }
      );
    });
  });

  res.end();
}

const supabaseClient = (req) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) {
      return null;
    }

    const cookieValue = decodeURIComponent(cookie.split('=')[1]);
    const authToken = cookieValue
      .replace('[', '')
      .replace(']', '')
      .split(',')[0]
      .replace(/"/g, '')
      .trim();

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_API_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      }
    );

    return supabase;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const saveChat = async (socket, supabase, data) => {
  const { error } = await supabase
    .from(process.env.SUPABASE_CHAT_RECORDS_TABLE)
    .insert({
      ...data
    });

  if (error) {
    console.error(error);
    socket.emit('chat_error', JSON.stringify({ message: error }));
    return;
  }
};
