'use client';
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Stack,
} from "@mui/material";
import ResponsiveDrawer from "./ResponsiveDrawer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Birch, Cafe_Royale, Mauntain_Mist, Corn } from "../Colors";
import SignIn from "./SignIn";
import AccountMenu from "./AccountMenu";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from "axios";
import { BASE_URL } from "../services/helper";

const pages = [
  "Find SGPA",
  "Find Ygpa",
  "Find Dgpa",
  "find Percentage",
  "GPA Goal Analyzer",
];
const forAniPages = ["SGPA", "Ygpa", "Dgpa", "percentage", "GPA Goal Analyzer"];

function Appbar({ email, setEmail }) {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [massage, setMassage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const func = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
      if (!token || token === "null") return;
      try {
        const response = await axios.get(`${BASE_URL}/user/me`, {
          headers: {
            authorization: "Bearer " + token,
          }
        });
        if (response.data?.email) {
          setEmail(response.data.email);
        }
      } catch (e) {
        console.error("Auth me check error:", e);
      }
    };
    func();
  }, [setEmail]);

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 1100, flexShrink: 0 }}>
      <MyAppbar email={email} setEmail={setEmail} pages={pages} setOpenSignIn={setOpenSignIn}></MyAppbar>
      <SignIn setEmail={setEmail} openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} massage={massage} setMassage={setMassage} setSnackbarOpen={setSnackbarOpen}></SignIn>
      <Snackbar open={snackbarOpen} anchorOrigin={{ vertical: "top", horizontal: "right" }} autoHideDuration={2000} 
      onClose={(event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackbarOpen(false);
      }}
        >
        <Alert severity="success">Login Sucessfully</Alert>
      </Snackbar>
    </div>
  );
}

const MyAppbar = ({ email, setEmail, pages, setOpenSignIn }) => {
  const router = useRouter();
  return (
    <div style={{ backgroundColor: `#E5AF05`, backdropFilter: 'blur(40px)', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)' }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack direction={"row"} alignItems="center">
          <ResponsiveDrawer email={email}></ResponsiveDrawer>
          <Button size="large" sx={{ color: 'white', fontSize: { xs: 16, md: 22 }, fontWeight: 900, textTransform: 'none', letterSpacing: 0.5 }} onClick={() => { router.push('/') }}>
            GPA Calc-ulator
          </Button>
        </Stack>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {pages.map((page, index) => (
            <Button
              key={page}
              sx={{ my: 2, color: 'white', ml: 2, fontSize: '0.95rem', fontWeight: '500', textTransform: 'capitalize' }}
              onClick={() => {
                if (index === 3) {
                  router.push("/findPercentage");
                } else if (index === 4) {
                  router.push("/gpaEquator");
                } else if (index === 1) {
                  router.push("/findYgpa");
                } else if (index === 0) {
                  router.push("/findSgpa");
                } else {
                  router.push("/findDgpa");
                }
              }}>
              {page}
            </Button>
          ))}
        </Box>

        <Button
          variant="contained"
          sx={{ backgroundColor: "#754B0F", display: (email) ? 'none' : 'block' }}
          onClick={() => { setOpenSignIn(true) }}
        >
          Sign In
        </Button>
        <AccountMenu email={email} ></AccountMenu>
      </Toolbar>
    </div>
  );
};

export { Appbar, pages, forAniPages };
