import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import { verifyAuthToken } from '@/lib/auth';
import { buildProfileBreakdown } from '@/src/utils/profileGpaUtils';
import { runGrandfatherMigration } from '@/lib/premiumMigration';

export async function GET(req) {
  try {
    const userPayload = verifyAuthToken(req);
    if (!userPayload) {
      return NextResponse.json({ message: 'Authentication Failed' }, { status: 401 });
    }

    await connectDB();
    await runGrandfatherMigration();
    const user = await User.findOne({ email: userPayload.email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const isPremium = Boolean(user.isPremium);
    const isLateralEntry = Boolean(user.isLateralEntry);
    const credits = isPremium ? (user.credits || []) : [];
    const breakdown = isPremium
      ? buildProfileBreakdown(credits, isLateralEntry)
      : buildProfileBreakdown([]);

    return NextResponse.json({
      _id: user._id.toString(),
      userId: user._id.toString(),
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      contact: user.contact || '',
      email: user.email,
      isPremium,
      isLateralEntry,
      credits,
      breakdown,
      requiresPremium: !isPremium,
    }, { status: 200 });
  } catch (error) {
    console.error('getUserInfo error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
