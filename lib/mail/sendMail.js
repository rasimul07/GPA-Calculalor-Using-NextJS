import { getTransporter, getDefaultFrom } from './transporter';

export async function sendMail({ to, subject, text, html, replyTo }) {
  const transporter = getTransporter();

  const info = await transporter.sendMail({
    from: getDefaultFrom(),
    to,
    subject,
    text,
    html,
    ...(replyTo ? { replyTo } : {}),
  });

  console.log('Email sent:', { to, subject, messageId: info.messageId });
}
