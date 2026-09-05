export const AUTH_MODES = { signin: 'signin', signup: 'signup' };

export function authUrl(pathname, mode) {
  return `${pathname}?auth=${mode}`;
}
