'use client';

import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';

import { supabaseClient } from './supabaseClient';

export default function withAuth(Component) {
  return function ProtectedPage({ children }) {
    const router = useRouter();

    const validate = useCallback(async () => {
      await supabaseClient.auth
        .getUser()
        .then((user) => {
          if (user.error) {
            router.push('/login');
          }
        })
        .catch((error) => {
          console.error({ error });
          router.push('/login');
        });
    }, [router]);

    useEffect(() => {
      validate();
    }, [validate]);

    return <Component>{children}</Component>;
  };
}
