import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import { verifyAuthToken } from '@/lib/auth';
import { buildProfileBreakdown, validateSemesterCredits } from '@/src/utils/profileGpaUtils';
import { runGrandfatherMigration } from '@/lib/premiumMigration';

async function getAuthedUser(req) {
  const userPayload = verifyAuthToken(req);
  if (!userPayload) return null;

  await connectDB();
  await runGrandfatherMigration();
  const user = await User.findOne({ email: userPayload.email });
  return user;
}

export async function GET(req) {
  try {
    const user = await getAuthedUser(req);
    if (!user) {
      return NextResponse.json({ message: 'Authentication Failed' }, { status: 401 });
    }

    const isPremium = Boolean(user.isPremium);
    const isLateralEntry = Boolean(user.isLateralEntry);
    const credits = isPremium ? (user.credits || []) : [];
    const breakdown = isPremium
      ? buildProfileBreakdown(credits, isLateralEntry)
      : buildProfileBreakdown([]);

    return NextResponse.json({
      userId: user._id.toString(),
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      isPremium,
      isLateralEntry,
      credits,
      breakdown,
      requiresPremium: !isPremium,
    }, { status: 200 });
  } catch (error) {
    console.error('Get credits error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const user = await getAuthedUser(req);
    if (!user) {
      return NextResponse.json({ message: 'Authentication Failed' }, { status: 401 });
    }

    if (!user.isPremium) {
      return NextResponse.json(
        { message: 'Premium required to save credit points', requiresPremium: true },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { credits, isLateralEntry } = body;

    if (!Array.isArray(credits)) {
      return NextResponse.json({ message: 'Credits must be an array' }, { status: 400 });
    }

    const validation = validateSemesterCredits(credits);
    if (!validation.valid) {
      return NextResponse.json({ message: validation.message }, { status: 400 });
    }

    user.credits = credits.map((value) => String(value));
    if (typeof isLateralEntry === 'boolean') {
      user.isLateralEntry = isLateralEntry;
    }
    await user.save();

    const breakdown = buildProfileBreakdown(user.credits, Boolean(user.isLateralEntry));

    return NextResponse.json({
      message: 'Credits saved successfully',
      userId: user._id.toString(),
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      isPremium: true,
      isLateralEntry: Boolean(user.isLateralEntry),
      credits: user.credits,
      breakdown,
    }, { status: 200 });
  } catch (error) {
    console.error('Update credits error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
