'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { fetchSession } from '@/src/utils/authSession';
import { AUTH_MODES } from '@/src/utils/authParams';

export default function AuthBootstrap({ userId, setEmail, setUserId, children }) {
  const [authReady, setAuthReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const authParam = searchParams.get('auth');

  useEffect(() => {
    let cancelled = false;

    const restoreSession = async () => {
      const session = await fetchSession();
      if (cancelled) return;

      if (session) {
        setEmail(session.email);
        setUserId(session.userId);
      }

      setAuthReady(true);
    };

    restoreSession();
    return () => {
      cancelled = true;
    };
  }, [setEmail, setUserId]);

  useEffect(() => {
    if (!authReady || !userId) return;

    const isHome = pathname === '/';
    const isAuthRoute = authParam === AUTH_MODES.signin || authParam === AUTH_MODES.signup;

    if (isHome || isAuthRoute) {
      router.replace(`/${userId}`);
    }
  }, [authReady, userId, pathname, authParam, router]);

  return children;
}
