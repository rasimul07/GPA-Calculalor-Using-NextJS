'use client';
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
} from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SchoolIcon from '@mui/icons-material/School';
import PercentIcon from '@mui/icons-material/Percent';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import SpeedIcon from '@mui/icons-material/Speed';
import DevicesIcon from '@mui/icons-material/Devices';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import { useRouter } from 'next/navigation';
import { Birch, Cafe_Royale, Corn } from '../Colors';
import { accentButtonSx } from '../styles/buttonStyles';
import { homeTools, homeBenefits, gpaStoreFeatures } from '../constants/siteConfig';
import PaymentOptions from './premium/PaymentOptions';
import '../index.css';
import { forAniPages } from './Appbar';

const toolIcons = {
  Calculate: CalculateIcon,
  CalendarMonth: CalendarMonthIcon,
  School: SchoolIcon,
  Percent: PercentIcon,
  TrackChanges: TrackChangesIcon,
};

const benefitIcons = [
  SpeedIcon,
  AccountBalanceIcon,
  TrackChangesIcon,
  DevicesIcon,
  LockOpenIcon,
  CloudDoneIcon,
];

const HomePage = () => {
  return (
    <Box>
      <HeroSection forAniPages={forAniPages} />
      <ToolsSection />
      <BenefitsSection />
      <GpaStoreSection />
      <PaymentSection />
      <ClosingCTA />
    </Box>
  );
};

const HeroSection = ({ forAniPages }) => {
  const router = useRouter();
  const [word, setWord] = useState(forAniPages[0]);

  useEffect(() => {
    let i = 0;
    let temp = forAniPages[i];
    let len = temp.length;
    const timer = setInterval(() => {
      if (len === -1) {
        i++;
        if (i === forAniPages.length) i = 0;
        temp = forAniPages[i];
        len = temp.length;
      }
      setWord(temp.substring(0, len));
      len = len - 1;
    }, 300);
    return () => clearInterval(timer);
  }, [forAniPages]);

  const scrollToTools = () => {
    document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: { xs: '70vh', md: '75vh' },
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(117,75,15,0.28) 0%, rgba(0,0,0,0.22) 50%, rgba(229,175,5,0.12) 100%)',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 6 }}>
        <Box sx={{ maxWidth: 700 }}>
          <Typography
            variant="h2"
            fontWeight={800}
            color="white"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.2rem' },
              textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
              mb: 1,
            }}
          >
            MAKAUT University GPA Calculator
          </Typography>

          <Typography
            variant="h6"
            color="rgba(255,255,255,0.9)"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
              mb: 3,
              fontWeight: 400,
            }}
          >
            For students of all MAKAUT-affiliated colleges — free calculators, plus a paid GPA store
            to save credits and track your academic performance.
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', mb: 4 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              textTransform="uppercase"
              color="white"
              sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, textShadow: '2px 2px 6px rgba(0,0,0,0.6)' }}
            >
              Find{' '}
            </Typography>
            <Box
              sx={{
                display: 'inline-block',
                borderRight: `6px solid ${Corn}`,
                pr: 0.5,
                ml: 0.5,
              }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                textTransform="uppercase"
                color="white"
                sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, textShadow: '2px 2px 6px rgba(0,0,0,0.6)' }}
              >
                {word}
              </Typography>
            </Box>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              variant="contained"
              size="large"
              onClick={scrollToTools}
              sx={{
                ...accentButtonSx,
                px: 3,
                py: 1.25,
                fontSize: '1rem',
              }}
            >
              Start Calculating
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => router.push('/?auth=signup')}
              sx={{
                borderColor: 'white',
                color: 'white',
                fontWeight: 600,
                px: 3,
                '&:hover': { borderColor: Corn, color: Corn, backgroundColor: 'rgba(255,255,255,0.08)' },
              }}
            >
              Create Account
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

const SectionHeading = ({ title, subtitle }) => (
  <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 5 } }}>
    <Typography
      variant="h4"
      fontWeight={700}
      color={Birch}
      sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, mb: 1 }}
    >
      {title}
    </Typography>
    {subtitle && (
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
        {subtitle}
      </Typography>
    )}
  </Box>
);

const ToolsSection = () => {
  const router = useRouter();

  return (
    <Box id="tools" sx={{ py: { xs: 6, md: 8 }, backgroundColor: '#FDFBF7' }}>
      <Container maxWidth="lg">
        <SectionHeading
          title="Free GPA Calculators"
          subtitle="All affiliated colleges of MAKAUT can calculate every GPA metric — no account needed."
        />
        <Grid container spacing={3}>
          {homeTools.map((tool) => {
            const Icon = toolIcons[tool.icon] || CalculateIcon;
            return (
              <Grid item xs={12} sm={6} md={4} key={tool.href}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    border: '1px solid #E0D8CC',
                    borderRadius: 3,
                    transition: 'box-shadow 0.2s, transform 0.2s',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(117,75,15,0.12)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        backgroundColor: 'rgba(229,175,5,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                      }}
                    >
                      <Icon sx={{ color: Cafe_Royale, fontSize: 28 }} />
                    </Box>
                    <Typography variant="h6" fontWeight={600} color={Birch} gutterBottom>
                      {tool.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                      {tool.description}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => router.push(tool.href)}
                      sx={{ color: Cafe_Royale, fontWeight: 600, textTransform: 'none', p: 0 }}
                    >
                      Try now →
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

const BenefitsSection = () => (
  <Box sx={{ py: { xs: 6, md: 8 } }}>
    <Container maxWidth="lg">
      <SectionHeading
        title="Why Use GPA Calc-ulator?"
        subtitle="Everything MAKAUT students need to track, calculate, and plan their academic performance."
      />
      <Grid container spacing={3}>
        {homeBenefits.map((benefit, index) => {
          const Icon = benefitIcons[index] || SpeedIcon;
          return (
            <Grid item xs={12} sm={6} md={4} key={benefit.title}>
              <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(117,75,15,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon sx={{ color: Cafe_Royale }} />
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} color={Birch} gutterBottom>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  </Box>
);

const GpaStoreSection = () => {
  const router = useRouter();

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: '#FDFBF7' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Chip
              label="Paid GPA Store"
              sx={{ backgroundColor: 'rgba(117,75,15,0.12)', color: Cafe_Royale, fontWeight: 600, mb: 2 }}
            />
            <Typography variant="h4" fontWeight={700} color={Birch} sx={{ mb: 2, fontSize: { xs: '1.5rem', md: '2rem' } }}>
              Store Your Credits & See All GPAs at a Glance
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
              Create an account and unlock the GPA store to save your semester credit scores.
              Your profile shows SGPA, YGPA, and DGPA calculated automatically — ready
              whenever you need them for job applications, higher studies, or any official form.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
              Calculators stay free. The GPA store is a one-time unlock via payment below.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push('/?auth=signup')}
                sx={{
                  backgroundColor: Cafe_Royale,
                  fontWeight: 600,
                  '&:hover': { backgroundColor: '#5a3a0c' },
                }}
              >
                Sign Up
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => router.push('/?auth=signin')}
                sx={{
                  borderColor: Cafe_Royale,
                  color: Cafe_Royale,
                  fontWeight: 600,
                  '&:hover': { borderColor: Birch, backgroundColor: 'rgba(117,75,15,0.06)' },
                }}
              >
                Sign In
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                border: '1px solid #E0D8CC',
                borderRadius: 3,
                p: 3,
                backgroundColor: 'white',
              }}
            >
              <Stack spacing={2}>
                {gpaStoreFeatures.map((item) => (
                  <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CloudDoneIcon sx={{ color: Cafe_Royale }} />
                    <Typography variant="body1" color={Birch}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const PaymentSection = () => (
  <Box sx={{ py: { xs: 6, md: 8 } }}>
    <Container maxWidth="md">
      <SectionHeading
        title="Unlock the GPA Store"
        subtitle="Pay once to save credits, access your dashboard, and use profile data in calculators."
      />
      <PaymentOptions id="payment-section" />
    </Container>
  </Box>
);

const ClosingCTA = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        py: { xs: 5, md: 6 },
        backgroundColor: Cafe_Royale,
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h5" fontWeight={700} color="white" sx={{ mb: 1 }}>
          Ready to Calculate Your GPA?
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)', mb: 3 }}>
          Join thousands of MAKAUT students using free calculators and the GPA Goal Analyzer today.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button
            variant="contained"
            size="large"
            onClick={() => router.push('/findSgpa')}
            sx={{ backgroundColor: Corn, color: Birch, fontWeight: 700, '&:hover': { backgroundColor: '#d4a004' } }}
          >
            Find SGPA
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => router.push('/gpaEquator')}
            sx={{
              borderColor: 'white',
              color: 'white',
              fontWeight: 600,
              '&:hover': { borderColor: Corn, color: Corn },
            }}
          >
            GPA Goal Analyzer
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;
