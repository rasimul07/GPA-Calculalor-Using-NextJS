export function buildForgotPasswordEmail({ resetUrl, userEmail }) {
  return {
    subject: 'Reset your MAKAUT GPA Calculator password',
    text: [
      'You requested a password reset for your MAKAUT GPA Calculator account.',
      '',
      `Account: ${userEmail}`,
      '',
      'Click the link below to set a new password (valid for 1 hour):',
      resetUrl,
      '',
      'If you did not request this, you can safely ignore this email.',
    ].join('\n'),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #333;">
        <h2 style="color: #423726;">Reset your password</h2>
        <p>You requested a password reset for your MAKAUT GPA Calculator account.</p>
        <p><strong>Account:</strong> ${userEmail}</p>
        <p>Click the button below to set a new password. This link expires in <strong>1 hour</strong>.</p>
        <p style="margin: 28px 0;">
          <a href="${resetUrl}" style="background: #8B6914; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
            Reset Password
          </a>
        </p>
        <p style="font-size: 13px; color: #666;">Or copy this link into your browser:<br />
          <a href="${resetUrl}" style="color: #8B6914; word-break: break-all;">${resetUrl}</a>
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="font-size: 13px; color: #888;">If you did not request this, you can safely ignore this email.</p>
      </div>
    `,
  };
}
