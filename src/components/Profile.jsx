'use client';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '../services/helper';
import { Birch, Cafe_Royale } from '../Colors';
import ProfileSummaryCards from './profile/ProfileSummaryCards';
import SemesterBreakdownTable from './profile/SemesterBreakdownTable';
import YearBreakdownTable from './profile/YearBreakdownTable';
import CreditPointsDrawer from './profile/CreditPointsDrawer';
import PremiumPaywall from './premium/PremiumPaywall';

const emptyBreakdown = {
  semesters: [],
  years: [],
  dgpa: '0.00',
  cgpa: '0.00',
  overallPercentage: '0.00',
  semesterCount: 0,
};

const Profile = () => {
  const router = useRouter();
  const params = useParams();
  const urlUserId = params?.userId;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [credits, setCredits] = useState([]);
  const [breakdown, setBreakdown] = useState(emptyBreakdown);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const fetchProfile = useCallback(async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token || token === 'null') {
      setLoading(false);
      router.replace('/?auth=signin');
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/user/credits`, {
        headers: { authorization: `Bearer ${token}` },
      });

      if (response.data) {
        const { userId, firstName: fn, lastName: ln, credits: cr, breakdown: bd, isPremium: premium } = response.data;

        if (urlUserId && userId && urlUserId !== userId) {
          router.replace(`/${userId}`);
          return;
        }

        setIsPremium(Boolean(premium));

        setFirstName(fn || '');
        setLastName(ln || '');
        setCredits(cr || []);
        setBreakdown(bd || emptyBreakdown);
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      if (error.response?.status === 401) {
        router.replace('/?auth=signin');
      }
    } finally {
      setLoading(false);
    }
  }, [router, urlUserId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSaved = (data) => {
    setCredits(data.credits || []);
    setBreakdown(data.breakdown || emptyBreakdown);
    if (data.firstName) setFirstName(data.firstName);
    if (data.lastName) setLastName(data.lastName);
  };

  const displayName = [firstName, lastName].filter(Boolean).join(' ') || 'Student';
  const hasCredits = breakdown.semesterCount > 0;
  const creditButtonLabel = hasCredits ? 'Edit Credit Points' : 'Add Credit Points';

  return (
    <Box sx={{ bgcolor: '#FDFBF7', minHeight: '100vh', pb: 6 }}>
      {loading && <MyBackDrop />}

      <Box
        sx={{
          bgcolor: Cafe_Royale,
          color: 'white',
          py: { xs: 4, md: 5 },
          mb: 3,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={800} gutterBottom>
            {displayName}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mb: 3 }}>
            {isPremium ? 'Your MAKAUT GPA Dashboard' : 'Unlock premium to access your GPA dashboard'}
          </Typography>
          {isPremium && (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              variant="contained"
              startIcon={hasCredits ? <EditIcon /> : <AddIcon />}
              onClick={() => setDrawerOpen(true)}
              sx={{
                bgcolor: '#E5AF05',
                color: Birch,
                fontWeight: 700,
                '&:hover': { bgcolor: '#d4a004' },
              }}
            >
              {creditButtonLabel}
            </Button>
            <Button
              variant="outlined"
              onClick={() => router.push('/editProfile')}
              sx={{
                borderColor: 'rgba(255,255,255,0.7)',
                color: 'white',
                fontWeight: 600,
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              Edit Profile
            </Button>
          </Stack>
          )}
        </Container>
      </Box>

      <Container maxWidth="lg">
        {!isPremium ? (
          <PremiumPaywall />
        ) : hasCredits ? (
          <Stack spacing={4}>
            <ProfileSummaryCards breakdown={breakdown} />
            <SemesterBreakdownTable semesters={breakdown.semesters} />
            <YearBreakdownTable years={breakdown.years} />
          </Stack>
        ) : (
          !loading && (
            <Card
              elevation={0}
              sx={{
                border: '1px dashed #E0D8CC',
                borderRadius: 3,
                textAlign: 'center',
                py: 6,
                px: 3,
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight={600} color={Birch} gutterBottom>
                  No credit points added yet
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
                  Add your semester obtained and full credit points to see SGPA, YGPA, DGPA, CGPA, and percentage breakdown.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setDrawerOpen(true)}
                  sx={{ bgcolor: Cafe_Royale, fontWeight: 700, '&:hover': { bgcolor: '#5a3a0c' } }}
                >
                  Add Credit Points
                </Button>
              </CardContent>
            </Card>
          )
        )}
      </Container>

      <CreditPointsDrawer
        open={drawerOpen && isPremium}
        onClose={() => setDrawerOpen(false)}
        initialCredits={credits}
        hasExistingCredits={hasCredits}
        onSaved={handleSaved}
      />
    </Box>
  );
};

export const MyBackDrop = () => (
  <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default Profile;
