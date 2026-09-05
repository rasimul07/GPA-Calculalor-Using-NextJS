import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import { verifyAuthToken } from '@/lib/auth';
import { runGrandfatherMigration } from '@/lib/premiumMigration';

export async function POST(req) {
  const unlockCode = process.env.PREMIUM_UNLOCK_CODE;
  if (!unlockCode) {
    return NextResponse.json({ message: 'Unlock not available' }, { status: 404 });
  }

  const userPayload = verifyAuthToken(req);
  if (!userPayload) {
    return NextResponse.json({ message: 'Authentication Failed' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { code } = body;

    if (!code || code !== unlockCode) {
      return NextResponse.json({ message: 'Invalid unlock code' }, { status: 400 });
    }

    await connectDB();
    await runGrandfatherMigration();

    const user = await User.findOneAndUpdate(
      { email: userPayload.email },
      { isPremium: true, premiumActivatedAt: new Date() },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Premium unlocked',
      isPremium: true,
    }, { status: 200 });
  } catch (error) {
    console.error('Unlock premium error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
