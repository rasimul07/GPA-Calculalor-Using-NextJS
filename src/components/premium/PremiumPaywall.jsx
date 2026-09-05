'use client';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import PaymentOptions from './PaymentOptions';
import { gpaStoreFeatures } from '../../constants/siteConfig';
import { BASE_URL } from '../../services/helper';
import { Birch, Cafe_Royale } from '../../Colors';
import PaymentSuccessModal from './PaymentSuccessModal';
import config from '@/config';

const showUnlockCode = config.showUnlockCode;

const PremiumPaywall = () => {
  const router = useRouter();
  const [unlockCode, setUnlockCode] = useState('');
  const [unlockError, setUnlockError] = useState('');
  const [unlocking, setUnlocking] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleUnlock = async () => {
    setUnlockError('');
    setUnlocking(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BASE_URL}/user/unlock-premium`,
        { code: unlockCode },
        { headers: { authorization: `Bearer ${token}` } }
      );
      if (response.data?.isPremium) {
        setShowSuccessModal(true);
      }
    } catch (err) {
      setUnlockError(err.response?.data?.message || 'Invalid unlock code.');
    } finally {
      setUnlocking(false);
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <LockIcon sx={{ fontSize: 48, color: Cafe_Royale, mb: 1 }} />
        <Typography variant="h5" fontWeight={700} color={Birch} gutterBottom>
          GPA Store — Premium Required
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520, mx: 'auto', lineHeight: 1.8 }}>
          All calculators remain free. Unlock the GPA store to save credit points, view your full
          GPA dashboard, and use profile data across calculators.
        </Typography>
      </Box>

      <Stack spacing={2} sx={{ mb: 4, maxWidth: 480, mx: 'auto' }}>
        {gpaStoreFeatures.map((feature) => (
          <Typography key={feature} variant="body2" color={Birch}>
            • {feature}
          </Typography>
        ))}
      </Stack>

      <Box sx={{ maxWidth: 640, mx: 'auto', mb: 3 }}>
        <PaymentOptions id="payment-section" listenForUnlock={false} />
      </Box>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          onClick={() => router.push('/')}
          sx={{ borderColor: Cafe_Royale, color: Cafe_Royale }}
        >
          Back to Home
        </Button>
        <Button
          variant="contained"
          onClick={() => router.push('/?auth=signin')}
          sx={{ bgcolor: Cafe_Royale, '&:hover': { bgcolor: '#5a3a0c' } }}
        >
          Sign In
        </Button>
      </Stack>

      {showUnlockCode && (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Have an unlock code?
          </Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              size="small"
              fullWidth
              placeholder="Enter code"
              value={unlockCode}
              onChange={(e) => setUnlockCode(e.target.value)}
            />
            <Button
              variant="outlined"
              disabled={unlocking || !unlockCode}
              onClick={handleUnlock}
              sx={{ flexShrink: 0 }}
            >
              {unlocking ? <CircularProgress size={20} /> : 'Unlock'}
            </Button>
          </Stack>
          {unlockError && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {unlockError}
            </Alert>
          )}
        </Box>
      )}
      <PaymentSuccessModal
        open={showSuccessModal}
        onComplete={() => window.location.reload()}
      />
    </Box>
  );
};

export default PremiumPaywall;
