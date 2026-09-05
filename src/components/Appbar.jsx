'use client';
import {
  Button,
  Toolbar,
  Box,
  Stack,
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

  const [massage, setMassage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const openSignIn = authParam === AUTH_MODES.signin;
  const openSignUp = authParam === AUTH_MODES.signup;

  const openAuth = useCallback(
    (mode) => {
      router.push(authUrl(pathname, mode));
    },
    [router, pathname]
  );

  const closeAuth = useCallback(() => {
    router.replace(pathname);
  }, [router, pathname]);

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 1100, flexShrink: 0 }}>
      <MyAppbar email={email} userId={userId} pages={pages} openAuth={openAuth} />
      <SignIn
        setEmail={setEmail}
        setUserId={setUserId}
        open={openSignIn}
        onClose={closeAuth}
        openAuth={openAuth}
        massage={massage}
        setMassage={setMassage}
        setSnackbarOpen={setSnackbarOpen}
        onAuthSuccess={(id) => router.push(`/${id}`)}
      />
      <SignUp
        setEmail={setEmail}
        setUserId={setUserId}
        open={openSignUp}
        onClose={closeAuth}
        openAuth={openAuth}
        setSnackbarOpen={setSnackbarOpen}
        onAuthSuccess={(id) => router.push(`/${id}`)}
      />
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={2000}
        onClose={(event, reason) => {
          if (reason === 'clickaway') return;
          setSnackbarOpen(false);
        }}
      >
        <Alert severity="success">Login Sucessfully</Alert>
      </Snackbar>
    </div>
  );
}

const MyAppbar = ({ email, userId, pages, openAuth }) => {
  const router = useRouter();
  return (
    <div style={{ backgroundColor: '#E5AF05', backdropFilter: 'blur(40px)', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Stack direction="row" alignItems="center">
          <ResponsiveDrawer email={email} userId={userId} />
          <Button
            size="large"
            sx={{ color: 'white', fontSize: { xs: 16, md: 22 }, fontWeight: 900, textTransform: 'none', letterSpacing: 0.5 }}
            onClick={() => router.push('/')}
          >
            GPA Calc-ulator
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
          sx={{ backgroundColor: '#754B0F', display: email ? 'none' : 'block' }}
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
