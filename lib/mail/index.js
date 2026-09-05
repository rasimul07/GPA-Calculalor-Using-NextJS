import config from '@/config';
import { isMailConfigured } from './transporter';
import { sendMail } from './sendMail';
import { buildContactEmail } from './templates/contact';
import { buildForgotPasswordEmail } from './templates/forgotPassword';

export { isMailConfigured, sendMail };
export { buildContactEmail, buildForgotPasswordEmail };

export async function sendContactEmail({ name, email, subject, message }) {
  const toEmail = config.contactToEmail || config.smtp.user;
  const { subject: mailSubject, text, html } = buildContactEmail({ name, email, subject, message });

  await sendMail({
    to: toEmail,
    subject: mailSubject,
    text,
    html,
    replyTo: email,
  });
}

export async function sendForgotPasswordEmail({ to, resetUrl, userEmail }) {
  const { subject, text, html } = buildForgotPasswordEmail({ resetUrl, userEmail });

  await sendMail({
    to,
    subject,
    text,
    html,
  });
}
