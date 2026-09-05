import axios from 'axios';
import { BASE_URL } from '../services/helper';

const TOKEN_KEY = 'token';

export function getStoredToken() {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token || token === 'null') return null;
  return token;
}

export function setStoredToken(token) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearStoredToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
}

export async function fetchSession() {
  const token = getStoredToken();
  if (!token) return null;

  try {
    const response = await axios.get(`${BASE_URL}/user/me`, {
      headers: { authorization: `Bearer ${token}` },
    });

    if (response.data?.email && response.data?.userId) {
      return {
        email: response.data.email,
        userId: response.data.userId,
      };
    }
    return null;
  } catch {
    clearStoredToken();
    return null;
  }
}
