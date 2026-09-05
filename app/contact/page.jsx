import ContactPage from '@/src/components/ContactPage';
import { siteName, contactKeywords } from '@/src/constants/seoConfig';

export const metadata = {
  title: 'Contact',
  description:
    'Contact MAKAUT GPA Calculator for help with SGPA, YGPA, DGPA calculators, GPA store payments, or account issues. We reply within 24–48 hours.',
  keywords: contactKeywords,
  openGraph: {
    title: `Contact | ${siteName}`,
    description: 'Get in touch about MAKAUT GPA calculators, GPA store, or payments.',
    type: 'website',
  },
  alternates: { canonical: '/contact' },
};

export default function Contact() {
  return <ContactPage />;
}
