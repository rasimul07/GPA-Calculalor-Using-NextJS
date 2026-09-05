import { NextResponse } from 'next/server';
import config from '@/config';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import { generateResetToken } from '@/lib/passwordReset';
import { isMailConfigured, sendForgotPasswordEmail } from '@/lib/mail';
import { forgotPasswordSchema } from '@/src/validation/authSchemas';

const GENERIC_SUCCESS_MESSAGE =
  'If an account exists for that email, a reset link has been sent.';

export async function POST(req) {
  try {
    const body = await req.json();

    try {
      await forgotPasswordSchema.validate(body, { abortEarly: false });
    } catch (err) {
      const message = err.errors?.[0] || 'Invalid email address';
      return NextResponse.json({ message }, { status: 400 });
    }

    const email = body.email.trim();

    await connectDB();
    const escaped = email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const user = await User.findOne({ email: { $regex: new RegExp(`^${escaped}$`, 'i') } });

    if (user && isMailConfigured()) {
      const { rawToken, hashedToken, expiresAt } = generateResetToken();

      user.resetPasswordToken = hashedToken;
      user.resetPasswordExpires = expiresAt;
      await user.save();

      const resetUrl = `${config.siteUrl}/reset-password?token=${rawToken}`;

      try {
        await sendForgotPasswordEmail({
          to: user.email,
          resetUrl,
          userEmail: user.email,
        });
      } catch (mailError) {
        console.error('Forgot password email error:', mailError);
      }
    } else if (user && !isMailConfigured()) {
      console.error('Forgot password: SMTP not configured');
    }

    return NextResponse.json({ message: GENERIC_SUCCESS_MESSAGE }, { status: 200 });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
