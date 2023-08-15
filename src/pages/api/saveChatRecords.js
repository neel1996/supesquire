import { createClient } from '@supabase/supabase-js';

export const save = async ({ checksum, message, actor }) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY
  );

  const { error } = await supabase
    .from(process.env.SUPABASE_CHAT_RECORDS_TABLE)
    .insert({
      message,
      checksum,
      actor
    });

  if (error) {
    console.error(error);
    throw error;
  }
};
