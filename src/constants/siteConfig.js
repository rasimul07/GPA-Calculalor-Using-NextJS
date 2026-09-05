export const siteConfig = {
  tagline: 'MAKAUT University GPA Calculator for all affiliated colleges',
  developer: {
    name: '',
    email: '',
    github: '',
    linkedin: '',
    portfolio: '',
  },
  contact: {
    email: 'mricoding782@gmail.com',
    responseTime: 'We usually reply within 24–48 hours',
    description: 'Questions about calculators, GPA store, payments, or account issues',
  },
  whatsapp: {
    phone: '917047615704',
    message: 'Hi! I have a question about the MAKAUT GPA Calculator.',
  },
  footerLinks: {
    tools: [
      { label: 'Home', href: '/' },
      { label: 'Find SGPA', href: '/findSgpa' },
      { label: 'Find YGPA', href: '/findYgpa' },
      { label: 'Find DGPA', href: '/findDgpa' },
      { label: 'Find Percentage', href: '/findPercentage' },
      { label: 'GPA Goal Analyzer', href: '/gpaEquator' },
    ],
    account: [
      { label: 'Sign In', href: '/?auth=signin' },
      { label: 'Sign Up', href: '/?auth=signup' },
      { label: 'Profile', href: '/profile' },
    ],
    support: [
      { label: 'Contact', href: '/contact' },
    ],
  },
  copyright: `© ${new Date().getFullYear()} MAKAUT GPA Calculator`,
};

export const homeTools = [
  {
    title: 'Find SGPA',
    description: 'Calculate your Semester Grade Point Average from subject credits and grades.',
    href: '/findSgpa',
    icon: 'Calculate',
  },
  {
    title: 'Find YGPA',
    description: 'Compute your Year Grade Point Average across all semesters in a year.',
    href: '/findYgpa',
    icon: 'CalendarMonth',
  },
  {
    title: 'Find DGPA',
    description: 'Get your Degree Grade Point Average for your entire course duration.',
    href: '/findDgpa',
    icon: 'School',
  },
  {
    title: 'Find Percentage',
    description: 'Convert your DGPA to percentage using the MAKAUT grading scale.',
    href: '/findPercentage',
    icon: 'Percent',
  },
  {
    title: 'GPA Goal Analyzer',
    description: 'Plan your target DGPA and see what grades you need in remaining semesters.',
    href: '/gpaEquator',
    icon: 'TrackChanges',
  },
];

export const homeBenefits = [
  {
    title: 'Instant & Accurate',
    description: 'Get precise MAKAUT GPA calculations in seconds — no manual math needed.',
  },
  {
    title: 'All Affiliated Colleges',
    description: 'Built for every college under Maulana Abul Kalam Azad University of Technology.',
  },
  {
    title: 'GPA Goal Analyzer',
    description: 'Set a target DGPA and plan the grades you need before your exams.',
  },
  {
    title: 'Mobile Friendly',
    description: 'Use on your phone or laptop — responsive design works everywhere.',
  },
  {
    title: 'No Account Required',
    description: 'All calculators are free to use without signing up.',
  },
  {
    title: 'GPA Store',
    description: 'Unlock the paid GPA store to save credits and access your SGPA, YGPA, and DGPA dashboard anytime.',
  },
];

export const paymentConfig = {
  buyMeACoffeeUrl: 'https://www.buymeacoffee.com/mritools',
  buyMeACoffeeButtonSrc:
    'https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=mritools&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff',
  qrCodePath: '/qr-code.png',
};

export const gpaStoreFeatures = [
  'Store semester credit points permanently',
  'View SGPA, YGPA, DGPA, CGPA, and percentage at a glance',
  'Use saved profile data in YGPA and DGPA calculators',
  'Access your dashboard from any device',
];

export const premiumFeatures = gpaStoreFeatures;
