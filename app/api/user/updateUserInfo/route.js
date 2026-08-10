import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import { verifyAuthToken } from '@/lib/auth';

export async function PUT(req) {
  try {
    const userPayload = verifyAuthToken(req);
    if (!userPayload) {
      return NextResponse.json({ message: 'Authentication Failed' }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();
    const { email, password } = userPayload;

    await User.findOneAndUpdate({ email, password }, body, { new: true });
    return NextResponse.json({ massage: 'saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('updateUserInfo error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
