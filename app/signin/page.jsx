'use client';
import React, { useState } from 'react';
import SignIn from '@/src/components/SignIn';

export default function SignInPage() {
  const [email, setEmail] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(true);
  const [massage, setMassage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <SignIn
        setEmail={setEmail}
        openSignIn={openSignIn}
        setOpenSignIn={setOpenSignIn}
        massage={massage}
        setMassage={setMassage}
        setSnackbarOpen={setSnackbarOpen}
      />
    </div>
  );
}
