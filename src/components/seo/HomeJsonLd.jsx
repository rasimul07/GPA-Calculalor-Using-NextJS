import { siteUrl, siteName, homeDescription } from '@/src/constants/seoConfig';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: siteName,
      url: siteUrl,
      description: homeDescription,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
        description: 'Free GPA calculators; paid GPA store for credit storage',
      },
      featureList: [
        'SGPA Calculator',
        'YGPA Calculator',
        'DGPA Calculator',
        'Percentage Calculator',
        'GPA Goal Analyzer',
        'GPA Store Dashboard',
      ],
    },
    {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
      description: homeDescription,
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is the MAKAUT GPA calculator free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. All SGPA, YGPA, DGPA, percentage, and GPA goal calculators are free without an account. The GPA store for saving credits requires a one-time unlock.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which colleges can use this calculator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'All colleges affiliated with Maulana Abul Kalam Azad University of Technology (MAKAUT), West Bengal.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the GPA store?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The paid GPA store lets you save semester credit points, view SGPA, YGPA, DGPA, CGPA, and percentage on your profile dashboard, and use profile data in calculators.',
          },
        },
      ],
    },
  ],
};

export default function HomeJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
