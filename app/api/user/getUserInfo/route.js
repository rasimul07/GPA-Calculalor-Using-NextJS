import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import { verifyAuthToken } from '@/lib/auth';

export async function GET(req) {
  try {
    const userPayload = verifyAuthToken(req);
    if (!userPayload) {
      return NextResponse.json({ message: 'Authentication Failed' }, { status: 401 });
    }

    await connectDB();
    const { email, password } = userPayload;
    const user = await User.findOne({ email, password });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('getUserInfo error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
