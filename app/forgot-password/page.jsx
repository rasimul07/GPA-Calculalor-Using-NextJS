import ForgotPasswordPage from '@/src/components/ForgotPasswordPage';
import { siteName } from '@/src/constants/seoConfig';

export const metadata = {
  title: 'Forgot Password',
  description: 'Reset your MAKAUT GPA Calculator account password.',
  openGraph: {
    title: `Forgot Password | ${siteName}`,
    description: 'Request a password reset link for your MAKAUT GPA Calculator account.',
    type: 'website',
  },
  alternates: { canonical: '/forgot-password' },
};

export default function ForgotPassword() {
  return <ForgotPasswordPage />;
}
