'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, Divider, Alert } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import { paymentConfig } from '../../constants/siteConfig';
import { BASE_URL } from '../../services/helper';
import { Birch, Cafe_Royale, Corn } from '../../Colors';
import PaymentSuccessModal from './PaymentSuccessModal';
import { usePremiumUnlockSocket } from '../../hooks/usePremiumUnlockSocket';

const PaymentOptions = ({ id, compact = false, listenForUnlock = true }) => {
  const { buyMeACoffeeUrl, buyMeACoffeeButtonSrc, qrCodePath } = paymentConfig;
  const [accountEmail, setAccountEmail] = useState('');
  const [isPremium, setIsPremium] = useState(true);

  const { showSuccessModal, dismissAndReload } = usePremiumUnlockSocket({
    enabled: listenForUnlock && !isPremium && Boolean(accountEmail),
  });

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token || token === 'null') return;

    axios
      .get(`${BASE_URL}/user/me`, { headers: { authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.data?.email) setAccountEmail(res.data.email);
        setIsPremium(Boolean(res.data?.isPremium));
      })
      .catch(() => {});
  }, []);

  return (
    <Card
      id={id}
      elevation={0}
      sx={{
        border: '1px solid #E0D8CC',
        borderRadius: 3,
        backgroundColor: 'white',
      }}
    >
      <CardContent sx={{ p: compact ? 2 : { xs: 3, md: 4 } }}>
        <Typography variant="h5" fontWeight={700} color={Birch} gutterBottom>
          Unlock GPA Store
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
          Calculators stay free. Pay once to unlock credit storage, your GPA dashboard, and profile
          data in calculators.
        </Typography>

        <Alert
          severity="warning"
          icon={<EmailIcon />}
          sx={{
            mb: 3,
            border: `2px solid ${Corn}`,
            borderRadius: 2,
            backgroundColor: 'rgba(229,175,5,0.18)',
            '& .MuiAlert-message': { width: '100%' },
          }}
        >
          <Typography variant="subtitle2" fontWeight={700} color={Birch} gutterBottom>
            Important — use the same email when paying
          </Typography>
          <Typography variant="body2" color={Birch} sx={{ lineHeight: 1.7 }}>
            {accountEmail ? (
              <>
                Your account email is{' '}
                <Box
                  component="span"
                  sx={{
                    fontWeight: 800,
                    color: Cafe_Royale,
                    bgcolor: 'rgba(117,75,15,0.1)',
                    px: 1,
                    py: 0.25,
                    borderRadius: 1,
                    fontFamily: 'monospace',
                  }}
                >
                  {accountEmail}
                </Box>
                . Enter this exact email on Buy Me a Coffee — otherwise premium will not unlock
                automatically.
              </>
            ) : (
              <>
                Sign in first, then pay using the <strong>exact same email</strong> as your account.
                If the emails don&apos;t match, premium will not unlock automatically.
              </>
            )}
          </Typography>
        </Alert>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          alignItems={{ xs: 'center', md: 'flex-start' }}
          divider={<Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />}
        >
          <Box sx={{ textAlign: 'center', flex: 1 }}>
            <Typography variant="subtitle2" fontWeight={600} color={Birch} sx={{ mb: 1.5 }}>
              Pay via Buy Me a Coffee
            </Typography>
            <a href={buyMeACoffeeUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={buyMeACoffeeButtonSrc}
                alt="Buy me a coffee"
                style={{ border: 'none', maxWidth: '100%', height: 'auto' }}
              />
            </a>
          </Box>

          <Box sx={{ textAlign: 'center', flex: 1 }}>
            <Typography variant="subtitle2" fontWeight={600} color={Birch} sx={{ mb: 1.5 }}>
              Or scan to pay
            </Typography>
            <Box
              component="img"
              src={qrCodePath}
              alt="Payment QR code"
              sx={{
                width: compact ? 160 : 200,
                height: compact ? 160 : 200,
                objectFit: 'contain',
                borderRadius: 2,
                border: '1px solid #E0D8CC',
              }}
            />
            <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
              Scan to pay — then contact support if paying outside BMC
            </Typography>
          </Box>
        </Stack>

        <Box
          sx={{
            mt: 3,
            p: 2,
            borderRadius: 2,
            backgroundColor: 'rgba(117,75,15,0.06)',
          }}
        >
          <Typography variant="subtitle2" fontWeight={600} color={Cafe_Royale} gutterBottom>
            How to unlock
          </Typography>
          <Typography variant="body2" color="text.secondary" component="ol" sx={{ pl: 2.5, m: 0 }}>
            <li>
              <strong>Create an account</strong> with the email you will use to pay
            </li>
            <li>
              On Buy Me a Coffee, enter that <strong>same email</strong> before checkout
            </li>
            <li>Premium unlocks automatically — usually within seconds</li>
          </Typography>
        </Box>
      </CardContent>
      <PaymentSuccessModal open={showSuccessModal} onComplete={dismissAndReload} />
    </Card>
  );
};

export default PaymentOptions;
