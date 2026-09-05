import nodemailer from 'nodemailer';
import config from '@/config';

let cachedTransporter = null;

export function isMailConfigured() {
  const { smtp, contactToEmail } = config;
  const toEmail = contactToEmail || smtp.user;
  return Boolean(toEmail && smtp.host && smtp.user && smtp.pass);
}

export function getTransporter() {
  if (!isMailConfigured()) {
    throw new Error('SMTP is not configured');
  }

  if (!cachedTransporter) {
    const { smtp } = config;
    cachedTransporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.port === 465,
      auth: { user: smtp.user, pass: smtp.pass },
    });
  }

  return cachedTransporter;
}

export function getDefaultFrom() {
  return `"MAKAUT GPA Calculator" <${config.smtp.user}>`;
}
