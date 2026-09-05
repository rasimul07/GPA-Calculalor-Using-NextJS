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
import LockResetIcon from '@mui/icons-material/LockReset';
import { Formik } from 'formik';
import Link from 'next/link';
import { AppTextField } from './common';
import { forgotPasswordSchema } from '../validation/authSchemas';
import { BASE_URL } from '../services/helper';
import { Birch, Cafe_Royale } from '../Colors';
import { accentButtonSx } from '../styles/buttonStyles';

const ForgotPasswordPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const showToast = (message, severity = 'success') => {
    setToast({ open: true, message, severity });
  };

  return (
    <Box sx={{ bgcolor: '#FDFBF7', minHeight: '100vh', pb: 6 }}>
      <Box sx={{ bgcolor: Cafe_Royale, color: 'white', py: { xs: 4, md: 5 }, mb: 4 }}>
        <Container maxWidth="sm">
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
            <LockResetIcon sx={{ fontSize: 32 }} />
            <Typography variant="h4" fontWeight={800}>
              Forgot Password
            </Typography>
          </Stack>
          <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 480, lineHeight: 1.8 }}>
            Enter your account email and we&apos;ll send you a link to reset your password.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="sm">
        <Card elevation={0} sx={{ border: '1px solid #E0D8CC', borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            {submitted ? (
              <Stack spacing={2}>
                <Alert severity="success">
                  If an account exists for that email, a reset link has been sent. Check your inbox
                  (and spam folder). The link expires in 1 hour.
                </Alert>
                <Button component={Link} href="/?auth=signin" variant="outlined" sx={{ alignSelf: 'flex-start' }}>
                  Back to Sign In
                </Button>
              </Stack>
            ) : (
              <Formik
                initialValues={{ email: '' }}
                validationSchema={forgotPasswordSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    const res = await fetch(`${BASE_URL}/user/forgot-password`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email: values.email.trim() }),
                    });
                    const data = await res.json();

                    if (res.ok) {
                      setSubmitted(true);
                    } else {
                      showToast(data.message || 'Something went wrong. Please try again.', 'error');
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
                        Reset your password
                      </Typography>
                      <AppTextField
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
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
                          'Send Reset Link'
                        )}
                      </Button>
                      <Button component={Link} href="/?auth=signin" size="small" sx={{ alignSelf: 'center' }}>
                        Back to Sign In
                      </Button>
                    </Stack>
                  </form>
                )}
              </Formik>
            )}
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

export default ForgotPasswordPage;
