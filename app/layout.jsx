'use client';
import React, { useState, Suspense } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Appbar } from '@/src/components/Appbar';
import Footer from '@/src/components/Footer';
import AuthBootstrap from '@/src/components/AuthBootstrap';
import theme from '@/src/theme/theme';
import '@/src/index.css';
import '@/src/App.css';

export default function RootLayout({ children }) {
  const [email, setEmail] = useState(null);
  const [userId, setUserId] = useState(null);

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
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Suspense fallback={null}>
                <AuthBootstrap userId={userId} setEmail={setEmail} setUserId={setUserId}>
                  <Appbar email={email} setEmail={setEmail} userId={userId} setUserId={setUserId} />
                </AuthBootstrap>
              </Suspense>
              <div style={{ flex: 1 }}>{children}</div>
              <Footer />
            </div>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
