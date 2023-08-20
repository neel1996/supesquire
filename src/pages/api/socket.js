import { Server } from 'socket.io';
import { inference } from './inference';
import { createClient } from '@supabase/supabase-js';

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log('Socket already connected');
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path: '/api/socket_io',
    addTrailingSlash: false,
    pingTimeout: 60000
  });

  res.socket.server.io = io;

  const supabase = supabaseClient(req);
  if (!supabase) {
    res.end();
  }

  io.on('connection', (socket) => {
    socket.on('disconnect', (reason) => console.error({ reason }));
    socket.on('error', (error) => console.error({ error }));

    socket.on('message', async (data) => {
      const { message, documentId } = data;

      const { error } = await saveChat(socket, supabase, {
        message,
        checksum: documentId,
        actor: 'human'
      });
      if (error) return;

      inference({ documentId, question: message, supabase }).then(
        async ({ answer, error }) => {
          if (error) {
            socket.emit('chat_error', error);
            return;
          }

          const { error: saveError } = await saveChat(socket, supabase, {
            message: answer,
            checksum: documentId,
            actor: 'ai'
          });
          if (saveError) return;

          socket.emit('ai_message', answer);
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
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_API_KEY,
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

const saveChat = async (socket, supabase, chatRecord) => {
  const { error } = await supabase
    .from(process.env.NEXT_PUBLIC_SUPABASE_CHAT_RECORDS_TABLE)
    .insert({
      ...chatRecord
    });

  if (error) {
    console.error(error);
    socket.emit('chat_error', error);
    return { error };
  }

  return { error: null };
};

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false
  }
};
