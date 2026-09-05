import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import { verifyAuthToken } from '@/lib/auth';
import { runGrandfatherMigration } from '@/lib/premiumMigration';

export async function GET(req) {
  const userPayload = verifyAuthToken(req);
  if (!userPayload) {
    return NextResponse.json({ message: 'Authentication Failed' }, { status: 401 });
  }

  try {
    await connectDB();
    await runGrandfatherMigration();
    const user = await User.findOne({ email: userPayload.email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      email: user.email,
      userId: user._id.toString(),
      isPremium: Boolean(user.isPremium),
    }, { status: 200 });
  } catch (error) {
    console.error('Me route error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
