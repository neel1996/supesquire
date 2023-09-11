import { NextResponse } from 'next/server';

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient(
    { req, res },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY
    }
  );

  const { data, error } = await supabase.auth.getSession();
  if (error || data?.session == null) {
    console.log('Redirecting to login');
    return NextResponse.json({}, { status: 401 });
  }

  return res;
}

export const config = {
  matcher: '/api/:path*'
};
