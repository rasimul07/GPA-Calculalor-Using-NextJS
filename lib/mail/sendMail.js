import { getTransporter, getDefaultFrom } from './transporter';

export async function sendMail({ to, subject, text, html, replyTo }) {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: getDefaultFrom(),
    to,
    subject,
    text,
    html,
    ...(replyTo ? { replyTo } : {}),
  });
}
