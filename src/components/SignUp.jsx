'use client';
import React from 'react';
import { Button, Typography, Stack, Card, CardActions, IconButton, CircularProgress } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { Formik } from 'formik';
import { BASE_URL } from '../services/helper';
import { setStoredToken } from '../utils/authSession';
import { AppTextField } from './common';
import { signUpSchema } from '../validation/authSchemas';

function SignUp({ setEmail, setUserId, open, onClose, openAuth, showToast, onAuthSuccess }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Card
        className="auth-dialog-card"
        sx={{
          display: 'inline-block',
          width: { xs: 320, md: 380 },
          padding: 3,
          position: 'relative',
        }}
      >
        <IconButton
          onClick={handleClose}
          aria-label="Close sign up"
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Formik
          key={open ? 'signup-open' : 'signup-closed'}
          initialValues={{ email: '', password: '' }}
          validationSchema={signUpSchema}
          validateOnBlur
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const res = await fetch(`${BASE_URL}/user/signup`, {
                method: 'POST',
                body: JSON.stringify({ email: values.email.trim(), password: values.password }),
                headers: { 'Content-Type': 'application/json' },
              });
              const data = await res.json();
              const token = data.token;

              if (token) {
                setStoredToken(token);
                setEmail(values.email.trim());
                if (data.userId) setUserId(data.userId);
                resetForm();
                handleClose();
                showToast?.('Account created successfully!', 'success');
                if (data.userId && onAuthSuccess) onAuthSuccess(data.userId);
              } else {
                showToast?.(data.massage || data.message || 'Sign up failed', 'error');
              }
            } catch (err) {
              console.error('Sign up error:', err);
              showToast?.('Sign up failed. Check your network connection.', 'error');
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
                <Typography variant="h5" textAlign="center" sx={{ fontWeight: '700', color: '#423726' }}>
                  Create Account
                </Typography>
                <Typography variant="body2" textAlign="center" color="text.secondary">
                  Join to track your GPA progress
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
                  placeholder="Choose a password (min 6 characters)"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
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
                  {isSubmitting ? <CircularProgress size={26} color="inherit" /> : 'Sign Up'}
                </Button>
              </CardActions>
            </form>
          )}
        </Formik>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 12 }}>
          <Typography variant="body2" textAlign="center" color="text.secondary">
            Already have an account?
          </Typography>
          <Button sx={{ width: 120, mt: 0.5 }} onClick={() => openAuth('signin')} size="small">
            Sign In
          </Button>
        </div>
      </Card>
    </Dialog>
  );
}

export default SignUp;
