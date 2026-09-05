export function buildContactEmail({ name, email, subject, message }) {
  const safeMessage = message.replace(/\n/g, '<br />');

  return {
    subject: `[Contact] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr />
      <p>${safeMessage}</p>
    `,
  };
}
