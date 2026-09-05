import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import { verifyAuthToken } from '@/lib/auth';
import { buildProfileBreakdown } from '@/src/utils/profileGpaUtils';
import { runGrandfatherMigration } from '@/lib/premiumMigration';

export async function PUT(req) {
  try {
    const userPayload = verifyAuthToken(req);
    if (!userPayload) {
      return NextResponse.json({ message: 'Authentication Failed' }, { status: 401 });
    }

    await connectDB();
    await runGrandfatherMigration();
    const body = await req.json();
    const { password: _password, credits, ...safeBody } = body;

    if (credits !== undefined) {
      const existingUser = await User.findOne({ email: userPayload.email });
      if (!existingUser?.isPremium) {
        return NextResponse.json(
          { message: 'Premium required to save credit points', requiresPremium: true },
          { status: 403 }
        );
      }
    }

    const updateData = credits !== undefined ? { ...safeBody, credits } : safeBody;

    const user = await User.findOneAndUpdate(
      { email: userPayload.email },
      updateData,
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const isPremium = Boolean(user.isPremium);
    const userCredits = isPremium ? (user.credits || []) : [];
    const breakdown = isPremium ? buildProfileBreakdown(userCredits) : buildProfileBreakdown([]);

    return NextResponse.json({
      massage: 'saved successfully',
      userId: user._id.toString(),
      isPremium,
      credits: userCredits,
      breakdown,
    }, { status: 200 });
  } catch (error) {
    console.error('updateUserInfo error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
