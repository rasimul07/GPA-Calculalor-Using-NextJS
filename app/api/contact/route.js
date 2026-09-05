import { NextResponse } from 'next/server';
import { isMailConfigured, sendContactEmail } from '@/lib/mail';
import { contactSchema } from '@/src/validation/contactSchema';

export async function POST(req) {
  try {
    const body = await req.json();

    try {
      await contactSchema.validate(body, { abortEarly: false });
    } catch (err) {
      const message = err.errors?.[0] || 'Invalid form data';
      return NextResponse.json({ message }, { status: 400 });
    }

    if (!isMailConfigured()) {
      console.error('Contact form: SMTP not configured');
      return NextResponse.json(
        { message: 'Contact form is not configured. Please email us directly.' },
        { status: 503 }
      );
    }

    const { name, email, subject, message } = body;
    await sendContactEmail({ name, email, subject, message });

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
