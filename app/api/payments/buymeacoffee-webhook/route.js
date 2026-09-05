import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import PaymentEvent from '@/lib/models/PaymentEvent';
import { verifyBmcSignature } from '@/lib/bmcWebhook';

export const dynamic = 'force-dynamic';

async function recordEvent(eventId, type, supporterEmail) {
  try {
    await PaymentEvent.create({ eventId, type, supporterEmail });
    return true;
  } catch (error) {
    if (error?.code === 11000) return false;
    throw error;
  }
}

async function findUserByEmail(email) {
  if (!email) return null;
  const escaped = email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return User.findOne({ email: { $regex: new RegExp(`^${escaped}$`, 'i') } });
}

async function grantPremium(email, paymentId) {
  const user = await findUserByEmail(email);
  if (!user) {
    console.warn(`BMC webhook: no user found for email ${email}`);
    return;
  }

  user.isPremium = true;
  user.premiumActivatedAt = new Date();
  if (paymentId) user.bmcPaymentId = paymentId;
  await user.save();
}

async function revokePremium(email, paymentId) {
  let user = null;
  if (paymentId) {
    user = await User.findOne({ bmcPaymentId: paymentId });
  }
  if (!user && email) {
    user = await findUserByEmail(email);
  }
  if (!user) {
    console.warn(`BMC webhook: no user found to revoke for ${email || paymentId}`);
    return;
  }

  user.isPremium = false;
  user.premiumActivatedAt = undefined;
  await user.save();
}

export async function POST(req) {
  const secret = process.env.BMC_WEBHOOK_SIGNING_SECRET;
  const rawBody = await req.text();
  const signature = req.headers.get('x-signature-sha256');

  if (secret) {
    if (!verifyBmcSignature(rawBody, signature, secret)) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    }
  } else {
    console.warn('BMC_WEBHOOK_SIGNING_SECRET not set — skipping signature verification');
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
  }

  const { event_id: eventId, type, data } = payload;

  if (!eventId || !type) {
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
  }

  try {
    await connectDB();

    const isNew = await recordEvent(eventId, type, data?.supporter_email || '');
    if (!isNew) {
      return NextResponse.json({ received: true, duplicate: true }, { status: 200 });
    }

    if (type === 'donation.created') {
      const email = data?.supporter_email;
      if (
        email
        && data?.status === 'succeeded'
        && data?.refunded === 'false'
      ) {
        await grantPremium(email, data.id);
      }
    } else if (type === 'donation.refunded') {
      const email = data?.supporter_email;
      await revokePremium(email, data?.id);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('BMC webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
