import { supabase } from '../supabase';

export const saveChat = async (chatRecord) => {
  const { error } = await supabase()
    .from(process.env.NEXT_PUBLIC_SUPABASE_CHAT_RECORDS_TABLE)
    .insert({
      ...chatRecord
    });

  if (error) {
    console.error(error);
    return { error };
  }

  return { error: null };
};
