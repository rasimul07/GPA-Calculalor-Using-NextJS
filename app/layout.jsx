import ClientAppShell from '@/src/components/ClientAppShell';
import { siteUrl, siteName, defaultDescription } from '@/src/constants/seoConfig';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    'MAKAUT GPA calculator',
    'MAKAUT SGPA',
    'MAKAUT YGPA',
    'MAKAUT DGPA',
    'MAKAUT percentage',
  ],
  robots: { index: true, follow: true },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <ClientAppShell>{children}</ClientAppShell>
      </body>
    </html>
  );
}
