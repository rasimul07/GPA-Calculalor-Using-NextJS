'use client';
import React from 'react';
import { Box, Typography, Card, CardContent, Stack, Divider } from '@mui/material';
import { paymentConfig } from '../../constants/siteConfig';
import { Birch, Cafe_Royale } from '../../Colors';

const PaymentOptions = ({ id, compact = false }) => {
  const { buyMeACoffeeUrl, buyMeACoffeeButtonSrc, qrCodePath } = paymentConfig;

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
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
          Calculators stay free. Pay once to unlock credit storage, your GPA dashboard, and profile
          data in calculators. Use the <strong>same email</strong> as your account when paying for
          automatic unlock.
        </Typography>

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
            <li>Create an account with the email you will pay with</li>
            <li>Complete payment via Buy Me a Coffee (recommended for auto-unlock)</li>
            <li>Premium unlocks automatically — usually within seconds</li>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PaymentOptions;
