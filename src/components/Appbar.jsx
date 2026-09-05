'use client';
import {
  Button,
  Toolbar,
  Box,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ResponsiveDrawer from './ResponsiveDrawer';
import { useState, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AccountMenu from './AccountMenu';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AUTH_MODES, authUrl } from '../utils/authParams';

const pages = [
  'Find SGPA',
  'Find Ygpa',
  'Find Dgpa',
  'find Percentage',
  'GPA Goal Analyzer',
];
const forAniPages = ['SGPA', 'Ygpa', 'Dgpa', 'percentage', 'GPA Goal Analyzer'];

function Appbar({ email, setEmail, userId, setUserId }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const authParam = searchParams.get('auth');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const openSignIn = authParam === AUTH_MODES.signin;
  const openSignUp = authParam === AUTH_MODES.signup;

  const showToast = useCallback((message, severity = 'success') => {
    setToast({ open: true, message, severity });
  }, []);

  const openAuth = useCallback(
    (mode) => {
      router.push(authUrl(pathname, mode));
    },
    [router, pathname]
  );

  const closeAuth = useCallback(() => {
    router.replace(pathname);
  }, [router, pathname]);

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 1100, flexShrink: 0 }}>
      <MyAppbar email={email} userId={userId} pages={pages} openAuth={openAuth} />
      <SignIn
        setEmail={setEmail}
        setUserId={setUserId}
        open={openSignIn}
        onClose={closeAuth}
        openAuth={openAuth}
        showToast={showToast}
        onAuthSuccess={(id) => router.push(`/${id}`)}
      />
      <SignUp
        setEmail={setEmail}
        setUserId={setUserId}
        open={openSignUp}
        onClose={closeAuth}
        openAuth={openAuth}
        showToast={showToast}
        onAuthSuccess={(id) => router.push(`/${id}`)}
      />
      <Snackbar
        open={toast.open}
        anchorOrigin={{
          vertical: isMobile ? 'bottom' : 'top',
          horizontal: isMobile ? 'center' : 'right',
        }}
        autoHideDuration={4000}
        onClose={handleToastClose}
        sx={{ mb: isMobile ? 2 : 0 }}
      >
        <Alert onClose={handleToastClose} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

const MyAppbar = ({ email, userId, pages, openAuth }) => {
  const router = useRouter();
  return (
    <div style={{ backgroundColor: '#E5AF05', backdropFilter: 'blur(40px)', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)' }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 1,
          px: { xs: 1, sm: 2 },
          minHeight: { xs: 56, md: 64 },
        }}
      >
        <Stack direction="row" alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
          <ResponsiveDrawer email={email} userId={userId} />
          <Button
            size="large"
            sx={{
              color: 'white',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.375rem' },
              fontWeight: 900,
              textTransform: 'none',
              letterSpacing: 0.5,
              whiteSpace: 'nowrap',
              minWidth: 0,
              px: { xs: 0.5, sm: 1 },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            onClick={() => router.push('/')}
          >
            GPA Calculator
          </Button>
        </Stack>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page, index) => (
            <Button
              key={page}
              sx={{ my: 2, color: 'white', ml: 2, fontSize: '0.95rem', fontWeight: '500', textTransform: 'capitalize' }}
              onClick={() => {
                if (index === 3) {
                  router.push('/findPercentage');
                } else if (index === 4) {
                  router.push('/gpaEquator');
                } else if (index === 1) {
                  router.push('/findYgpa');
                } else if (index === 0) {
                  router.push('/findSgpa');
                } else {
                  router.push('/findDgpa');
                }
              }}
            >
              {page}
            </Button>
          ))}
        </Box>

        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: '#754B0F',
            display: email ? 'none' : 'inline-flex',
            flexShrink: 0,
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            px: { xs: 1.5, sm: 2 },
            py: { xs: 0.6, sm: 0.75 },
            minWidth: 'auto',
          }}
          onClick={() => openAuth(AUTH_MODES.signin)}
        >
          Sign In
        </Button>
        <AccountMenu email={email} userId={userId} />
      </Toolbar>
    </div>
  );
};

export { Appbar, pages, forAniPages };
