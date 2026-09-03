'use client';
import React, { useState, useEffect } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Appbar } from '@/src/components/Appbar';
import axios from 'axios';
import { BASE_URL } from '@/src/services/helper';
import theme from '@/src/theme/theme';
import '@/src/index.css';
import '@/src/App.css';

export default function RootLayout({ children }) {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token || token === 'null') return;
      try {
        const response = await axios.get(`${BASE_URL}/user/me`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (response.data?.email) {
          setEmail(response.data.email);
        }
      } catch (err) {
        console.error('Failed to fetch user in RootLayout:', err);
      }
    };
    fetchUser();
  }, []);

  return (
    <html lang="en">
      <head>
        <title>MAKAUT GPA Calculator & Analyzer</title>
        <meta name="description" content="Calculate SGPA, YGPA, DGPA, percentages, and analyze target GPA for MAKAUT degree." />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '100vh'}}>
              <Appbar email={email} setEmail={setEmail} />
              <div style={{ flex: 1, overflow: 'auto' }}>{children}</div>
            </div>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
