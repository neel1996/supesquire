import { useRouter } from 'next/navigation';

export const useHttpClient = () => {
  const route = useRouter();

  const fetch = async (url, options) => {
    const res = await window.fetch(url, {
      ...options,
      next: {
        revalidate: 300
      }
    });

    if (res.status === 401) {
      route.replace('/login');
      return;
    }

    return res;
  };

  return {
    fetch
  };
};
