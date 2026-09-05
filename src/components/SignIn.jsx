'use client';
import React from 'react';
import { Button, Typography, Stack, Card, CardActions, IconButton, CircularProgress, Link } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '../services/helper';
import { setStoredToken } from '../utils/authSession';
import { AppTextField } from './common';
import { signInSchema } from '../validation/authSchemas';

function SignIn({ setEmail, setUserId, open, onClose, openAuth, showToast, onAuthSuccess }) {
  const router = useRouter();

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      scroll="body"
      sx={{
        '& .MuiDialog-container': {
          alignItems: { xs: 'flex-end', sm: 'center' },
        },
      }}
      PaperProps={{
        sx: {
          m: { xs: 0, sm: 2 },
          width: '100%',
          maxWidth: { xs: '100%', sm: 400 },
          borderRadius: { xs: '16px 16px 0 0', sm: '16px' },
          maxHeight: { xs: '92dvh', sm: 'none' },
        },
      }}
    >
      <Card
        className="auth-dialog-card"
        sx={{
          width: '100%',
          p: { xs: 2, sm: 3 },
          pt: { xs: 3.5, sm: 3 },
          position: 'relative',
          boxShadow: 'none',
        }}
      >
        <IconButton
          onClick={handleClose}
          aria-label="Close sign in"
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Formik
          key={open ? 'signin-open' : 'signin-closed'}
          initialValues={{ email: '', password: '' }}
          validationSchema={signInSchema}
          validateOnBlur
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const res = await fetch(`${BASE_URL}/user/signin`, {
                method: 'POST',
                body: JSON.stringify({ email: values.email.trim(), password: values.password }),
                headers: { 'Content-Type': 'application/json' },
              });
              const data = await res.json();
              const token = data.token;

              if (token) {
                setStoredToken(token);
                setEmail(data.email || values.email.trim());
                if (data.userId) setUserId(data.userId);
                resetForm();
                handleClose();
                showToast?.('Signed in successfully!', 'success');
                if (data.userId && onAuthSuccess) onAuthSuccess(data.userId);
              } else {
                showToast?.(data.massage || data.message || 'Invalid email or password', 'error');
              }
            } catch (err) {
              console.error('Sign in error:', err);
              showToast?.('Sign in failed. Check your network connection.', 'error');
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
                <Typography
                  variant="h5"
                  textAlign="center"
                  sx={{ fontWeight: '700', color: '#423726', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
                >
                  Welcome Back
                </Typography>
                <Typography variant="body2" textAlign="center" color="text.secondary">
                  Sign in to save your credit data
                </Typography>
                <AppTextField
                  name="email"
                  label="Email"
                  type="email"
                  size="medium"
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <AppTextField
                  name="password"
                  label="Password"
                  type="password"
                  size="medium"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Typography variant="body2" textAlign="right">
                  <Link
                    component="button"
                    type="button"
                    variant="body2"
                    onClick={() => {
                      handleClose();
                      router.push('/forgot-password');
                    }}
                    sx={{ cursor: 'pointer', textDecoration: 'none' }}
                  >
                    Forgot password?
                  </Link>
                </Typography>
              </Stack>
              <CardActions sx={{ justifyContent: 'center', pt: 2, px: 0 }}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress size={26} color="inherit" /> : 'Sign In'}
                </Button>
              </CardActions>
            </form>
          )}
        </Formik>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 12 }}>
          <Typography variant="body2" textAlign="center" color="text.secondary">
            Don&apos;t have an account?
          </Typography>
          <Button sx={{ width: 120, mt: 0.5 }} onClick={() => openAuth('signup')} size="small">
            Sign Up
          </Button>
        </div>
      </Card>
    </Dialog>
  );
}

export default SignIn;
