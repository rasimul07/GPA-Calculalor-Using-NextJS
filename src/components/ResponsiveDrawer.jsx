'use client';
import { Drawer, Box, Typography, Divider, Avatar, List, ListItemButton, ListItemText, Stack } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";
import { pages } from "./Appbar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { clearStoredToken } from "../utils/authSession";

function ResponsiveDrawer(props) {
  const router = useRouter();
  const email = props.email;
  const drpages = [...pages];
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => setIsDrawerOpen(true)}
        sx={{
          mr: { xs: 0.5, sm: 1 },
          display: {
            md: 'none',
          },
        }}
      >
        <MenuIcon sx={{ height: 28, width: 28 }} />
      </IconButton>

      <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Box width={'250px'} sx={{ background: "#2C2C2E", color: "#fff", height: '100vh' }}>
          <Stack style={{ alignItems: 'center', padding: '20px' }} >
            <Avatar sx={{ height: { md: 70, xs: 50 }, width: { md: 70, xs: 50 }, fontSize: 24 }}
              alt={email || "User"}
              src="/static/images/avatar/1.jpg"
            ></Avatar>
            <Typography variant="h6" paddingTop={'8px'} fontSize={14} color="#e0e0e0">{email || 'Not logged in'}</Typography>
          </Stack>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />
          <List>
            <ListItemButton onClick={() => {
              setIsDrawerOpen(false);
              router.push('/');
            }}>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={() => {
              setIsDrawerOpen(false);
              router.push(props.userId ? `/${props.userId}` : '/profile');
            }}>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </List>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />
          <List>
            {drpages.map((item, index) => (
              <ListItemButton key={item} onClick={() => {
                setIsDrawerOpen(false);
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
                <ListItemText primary={`${item}`} />
              </ListItemButton>
            ))}
            <LogInLogOut email={email} setIsDrawerOpen={setIsDrawerOpen}></LogInLogOut>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

function LogInLogOut(props) {
  const router = useRouter();
  const email = props.email;
  if (!email) {
    return (
      <ListItemButton onClick={() => {
        props.setIsDrawerOpen(false);
        router.push('/?auth=signin');
      }} >
        <ListItemText primary="Log in" />
      </ListItemButton>
    );
  }
  return (
    <ListItemButton onClick={() => {
      props.setIsDrawerOpen(false);
      clearStoredToken();
      window.location.href = '/';
    }}>
      <ListItemText primary="Log out" />
    </ListItemButton>
  );
}

export default ResponsiveDrawer;