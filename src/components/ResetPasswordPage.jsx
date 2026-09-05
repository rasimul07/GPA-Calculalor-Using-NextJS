'use client';
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppTextField } from './common';
import { resetPasswordSchema } from '../validation/authSchemas';
import { BASE_URL } from '../services/helper';
import { Birch, Cafe_Royale } from '../Colors';
import { accentButtonSx } from '../styles/buttonStyles';

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const showToast = (message, severity = 'success') => {
    setToast({ open: true, message, severity });
  };

  if (!token) {
    return (
      <Box sx={{ bgcolor: '#FDFBF7', minHeight: '100vh', pb: 6 }}>
        <Container maxWidth="sm" sx={{ pt: 8 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            Invalid reset link. Please request a new password reset.
          </Alert>
          <Button component={Link} href="/forgot-password" variant="contained" sx={accentButtonSx}>
            Request Reset Link
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#FDFBF7', minHeight: '100vh', pb: 6 }}>
      <Box sx={{ bgcolor: Cafe_Royale, color: 'white', py: { xs: 4, md: 5 }, mb: 4 }}>
        <Container maxWidth="sm">
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
            <VpnKeyIcon sx={{ fontSize: 32 }} />
            <Typography variant="h4" fontWeight={800} sx={{ fontSize: { xs: '1.35rem', sm: '2rem' } }}>
              Set New Password
            </Typography>
          </Stack>
          <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 480, lineHeight: 1.8 }}>
            Choose a new password for your account. This link expires in 1 hour.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="sm">
        <Card elevation={0} sx={{ border: '1px solid #E0D8CC', borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Formik
              initialValues={{ token, password: '', confirmPassword: '' }}
              enableReinitialize
              validationSchema={resetPasswordSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const res = await fetch(`${BASE_URL}/user/reset-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      token: values.token,
                      password: values.password,
                      confirmPassword: values.confirmPassword,
                    }),
                  });
                  const data = await res.json();

                  if (res.ok) {
                    showToast('Password reset successfully! Redirecting to sign in...', 'success');
                    setTimeout(() => router.push('/?auth=signin'), 1500);
                  } else {
                    showToast(data.message || 'Failed to reset password.', 'error');
                  }
                } catch {
                  showToast('Network error. Please try again.', 'error');
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Stack spacing={2}>
                    <Typography variant="h6" fontWeight={700} color={Birch}>
                      New password
                    </Typography>
                    <AppTextField
                      name="password"
                      label="New password"
                      type="password"
                      placeholder="At least 6 characters"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                    <AppTextField
                      name="confirmPassword"
                      label="Confirm password"
                      type="password"
                      placeholder="Re-enter your password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
                      sx={{ ...accentButtonSx }}
                    >
                      {isSubmitting ? (
                        <CircularProgress size={26} sx={{ color: Birch }} />
                      ) : (
                        'Reset Password'
                      )}
                    </Button>
                    <Button component={Link} href="/forgot-password" size="small" sx={{ alignSelf: 'center' }}>
                      Request a new link
                    </Button>
                  </Stack>
                </form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Container>

      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity={toast.severity}
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
          sx={{ width: '100%' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ResetPasswordPage;
