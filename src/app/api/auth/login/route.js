import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  const requestURL = new URL(req.url);
  const formData = await req.formData();

  const email = formData.get('email');
  const password = formData.get('password');

  const supabase = createRouteHandlerClient(
    { cookies },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY
    }
  );

  await supabase.auth.signInWithPassword({
    email,
    password
  });

  return NextResponse.redirect(requestURL.origin, {
    status: 301
  });
};
