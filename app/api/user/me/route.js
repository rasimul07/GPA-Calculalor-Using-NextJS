import { NextResponse } from 'next/server';
import { verifyAuthToken } from '@/lib/auth';

export async function GET(req) {
  const user = verifyAuthToken(req);
  if (!user) {
    return NextResponse.json({ message: 'Authentication Failed' }, { status: 401 });
  }
  return NextResponse.json({ email: user.email }, { status: 200 });
}
