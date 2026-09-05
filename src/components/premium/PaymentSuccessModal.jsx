'use client';
import React, { useEffect } from 'react';
import { Box, Dialog, Typography, keyframes } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Birch, Cafe_Royale, Corn } from '../../Colors';

const scaleIn = keyframes`
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); }
`;

const confettiFall = keyframes`
  0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(120px) rotate(360deg); opacity: 0; }
`;

const CONFETTI_COLORS = [Corn, Cafe_Royale, '#2E7D32', '#FF6B6B', '#4FC3F7'];

const Confetti = () => (
  <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
    {Array.from({ length: 24 }, (_, i) => (
      <Box
        key={i}
        sx={{
          position: 'absolute',
          top: `${10 + (i % 6) * 12}%`,
          left: `${(i * 17) % 100}%`,
          width: 8,
          height: 8,
          borderRadius: i % 2 === 0 ? '50%' : 0,
          backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          animation: `${confettiFall} ${1.2 + (i % 5) * 0.2}s ease-in forwards`,
          animationDelay: `${(i % 8) * 0.08}s`,
        }}
      />
    ))}
  </Box>
);

const PaymentSuccessModal = ({ open, onComplete }) => {
  useEffect(() => {
    if (!open) return undefined;

    const timer = setTimeout(() => {
      onComplete?.();
    }, 2500);

    return () => clearTimeout(timer);
  }, [open, onComplete]);

  return (
    <Dialog
      open={open}
      maxWidth="xs"
      fullWidth
      disableEscapeKeyDown
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',
          textAlign: 'center',
          p: 3,
          background: 'linear-gradient(180deg, #FDFBF7 0%, #fff 100%)',
          border: `2px solid ${Corn}`,
        },
      }}
      BackdropProps={{
        sx: { backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0,0,0,0.55)' },
      }}
    >
      <Confetti />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 2,
          animation: `${scaleIn} 0.6s ease-out`,
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 72, color: '#2E7D32' }} />
      </Box>
      <Typography variant="h5" fontWeight={800} color={Birch} gutterBottom>
        Payment Successful!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
        GPA Store unlocked — loading your dashboard...
      </Typography>
      <Typography variant="caption" display="block" color={Cafe_Royale} sx={{ mt: 2, fontWeight: 600 }}>
        Thank you for your support
      </Typography>
    </Dialog>
  );
};

export default PaymentSuccessModal;
