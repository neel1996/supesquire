import { supabase } from '../supabase';

const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET;

export const download = async (objectId) => {
  const { data, error } = await supabase()
    .storage.from(bucket)
    .download(objectId);

  if (error) {
    console.error(error);
    return { error };
  }

  return { file: data };
};
