import { Suspense } from 'react';
import ResetPasswordPage from '@/src/components/ResetPasswordPage';
import { siteName } from '@/src/constants/seoConfig';

export const metadata = {
  title: 'Reset Password',
  description: 'Set a new password for your MAKAUT GPA Calculator account.',
  openGraph: {
    title: `Reset Password | ${siteName}`,
    description: 'Set a new password for your MAKAUT GPA Calculator account.',
    type: 'website',
  },
  alternates: { canonical: '/reset-password' },
};

export default function ResetPassword() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordPage />
    </Suspense>
  );
}
