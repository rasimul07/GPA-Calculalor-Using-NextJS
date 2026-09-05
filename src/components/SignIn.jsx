'use client';
import React, { useState, useEffect } from 'react';
import { Button, Typography, Stack, Card, CardActions, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { BASE_URL } from '../services/helper';
import { setStoredToken } from '../utils/authSession';
import { AppTextField } from './common';

function SignIn({ setEmail, setUserId, open, onClose, openAuth, massage, setMassage, setSnackbarOpen, onAuthSuccess }) {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!open) {
      setEmailId('');
      setPassword('');
      setMassage('');
    }
  }, [open, setMassage]);

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
          aria-label="Close sign in"
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Stack spacing={2}>
          <Typography variant="h5" textAlign="center" sx={{ fontWeight: '700', color: '#423726' }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" textAlign="center" color="text.secondary">
            Sign in to save your credit data
          </Typography>
          <AppTextField
            label="Email"
            type="email"
            size="medium"
            placeholder="you@example.com"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
          <AppTextField
            label="Password"
            type="password"
            size="medium"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography textAlign="center" color="error" sx={{ fontSize: '0.85rem', minHeight: '20px' }}>
            {massage}
          </Typography>
        </Stack>
        <CardActions sx={{ justifyContent: 'center', pt: 2, px: 0 }}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            size="large"
            onClick={() => {
              fetch(`${BASE_URL}/user/signin`, {
                method: 'POST',
                body: JSON.stringify({ email: emailId, password }),
                headers: { 'Content-Type': 'application/json' },
              })
                .then((res) => res.json())
                .then((data) => {
                  setMassage(data.massage);
                  const token = data.token;
                  if (token) {
                    setSnackbarOpen(true);
                    setStoredToken(token);
                    setEmail(data.email || emailId);
                    if (data.userId) {
                      setUserId(data.userId);
                    }
                    handleClose();
                    if (data.userId && onAuthSuccess) {
                      onAuthSuccess(data.userId);
                    }
                  }
                })
                .catch((err) => {
                  console.error('Sign in error:', err);
                  setMassage('Sign in failed. Check network connection.');
                });
            }}
          >
            Sign In
          </Button>
        </CardActions>
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
