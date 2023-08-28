'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { supabaseClient } from './supabaseClient';

export default function withAuth(Component) {
  return function ProtectedPage({ children }) {
    const router = useRouter();

    useEffect(() => {
      const validate = async () => {
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
      };

      validate();
    }, [router]);

    return <Component>{children}</Component>;
  };
}
