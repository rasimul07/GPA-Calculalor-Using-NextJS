import jwt from 'jsonwebtoken';
import config from '@/config';

export const JWT_SECRET = config.jwtSecret;

export function verifyAuthToken(req) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
}
