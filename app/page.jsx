import HomePage from '@/src/components/HomePage';
import HomeJsonLd from '@/src/components/seo/HomeJsonLd';
import {
  siteUrl,
  siteName,
  homeTitle,
  homeDescription,
  homeKeywords,
} from '@/src/constants/seoConfig';

export const metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  keywords: homeKeywords,
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: siteUrl,
    siteName,
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: homeTitle,
    description: homeDescription,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <HomePage />
    </>
  );
}
