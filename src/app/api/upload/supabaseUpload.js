import { supabase } from '../supabase';
import { getChecksum } from './checksumGenerator';

const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET;

export const upload = async (file) => {
  const checksum = await getChecksum(file);
  const fileBlob = await file.arrayBuffer();
  const fileBuffer = Buffer.from(fileBlob);

  const { data, error } = await supabase()
    .storage.from(bucket)
    .upload(`${checksum}.pdf`, fileBuffer, {
      cacheControl: '3600',
      upsert: true,
      contentType: file.type
    });

  if (error) {
    console.error(error);
    throw error;
  }

  return { ...data, checksum };
};
