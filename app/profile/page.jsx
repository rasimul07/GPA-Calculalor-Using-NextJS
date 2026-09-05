'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '@/src/services/helper';
import { MyBackDrop } from '@/src/components/Profile';

export default function ProfileRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const redirectToProfile = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token || token === 'null') {
        router.replace('/?auth=signin');
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/user/me`, {
          headers: { authorization: `Bearer ${token}` },
        });
        if (response.data?.userId) {
          router.replace(`/${response.data.userId}`);
        } else {
          router.replace('/?auth=signin');
        }
      } catch {
        router.replace('/?auth=signin');
      }
    };

    redirectToProfile();
  }, [router]);

  return <MyBackDrop />;
}
