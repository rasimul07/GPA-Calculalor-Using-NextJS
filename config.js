/**
 * Central environment configuration.
 * All process.env access should go through this file.
 */

const config = {
  // Public (client-safe — NEXT_PUBLIC_*)
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://gpa.tool.mridev.in',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || '/api',
  showUnlockCode: process.env.NEXT_PUBLIC_SHOW_UNLOCK_CODE === 'true',

  // Server
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  isDev: process.env.NODE_ENV !== 'production',
  databaseUrl: process.env.DATABASE,
  jwtSecret: process.env.JWT_SECRET || 'secretGPA',
  bmcWebhookSigningSecret: process.env.BMC_WEBHOOK_SIGNING_SECRET || '',
  premiumUnlockCode: process.env.PREMIUM_UNLOCK_CODE || '',
  contactToEmail: process.env.CONTACT_TO_EMAIL || '',
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || 'mricoding782@gmail.com',
    pass: process.env.SMTP_PASS || '',
  },
};

module.exports = config;
