import { cookies } from 'next/headers';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

let supabaseSingleton = null;

const createSupabaseClient = () => {
  let cookieStore = cookies();

  console.log('Creating supabase client with cookies');

  const client = createServerComponentClient(
    { cookies: () => cookieStore },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY
    }
  );

  supabaseSingleton = client;

  return client;
};

export const supabase = () => {
  if (supabaseSingleton) {
    console.log('Returning existing supabase client');
    return supabaseSingleton;
  }

  return createSupabaseClient();
};
