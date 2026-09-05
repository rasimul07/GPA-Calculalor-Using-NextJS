import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import { hashResetToken } from '@/lib/passwordReset';
import { resetPasswordSchema } from '@/src/validation/authSchemas';

export async function POST(req) {
  try {
    const body = await req.json();

    try {
      await resetPasswordSchema.validate(body, { abortEarly: false });
    } catch (err) {
      const message = err.errors?.[0] || 'Invalid form data';
      return NextResponse.json({ message }, { status: 400 });
    }

    const { token, password } = body;
    const hashedToken = hashResetToken(token);

    await connectDB();

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid or expired reset link. Please request a new one.' },
        { status: 400 }
      );
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return NextResponse.json({ message: 'Password reset successfully' }, { status: 200 });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
