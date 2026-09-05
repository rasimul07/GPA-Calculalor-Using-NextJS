'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { BASE_URL } from '../services/helper';

const POLL_INTERVAL_MS = 5000;

export function usePremiumUnlockSocket({ enabled }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const unlockedRef = useRef(false);

  const handleUnlock = useCallback(() => {
    if (unlockedRef.current) return;
    unlockedRef.current = true;
    setShowSuccessModal(true);
  }, []);

  const dismissAndReload = useCallback(() => {
    window.location.reload();
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token || token === 'null') return undefined;

    const socket = io({
      path: '/socket.io',
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
    });

    socket.on('premium:unlocked', () => {
      handleUnlock();
    });

    const pollTimer = setInterval(async () => {
      if (unlockedRef.current) return;

      try {
        const res = await axios.get(`${BASE_URL}/user/me`, {
          headers: { authorization: `Bearer ${token}` },
        });
        if (res.data?.isPremium) {
          handleUnlock();
        }
      } catch {
        // ignore poll errors
      }
    }, POLL_INTERVAL_MS);

    return () => {
      clearInterval(pollTimer);
      socket.disconnect();
    };
  }, [enabled, handleUnlock]);

  return { showSuccessModal, dismissAndReload, triggerSuccessModal: handleUnlock };
}
