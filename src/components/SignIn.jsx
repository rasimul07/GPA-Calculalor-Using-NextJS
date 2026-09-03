'use client';
import React, { useState } from "react";
import SignUp from './SignUp';
import { Button, Typography, Stack, Card, CardActions } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import { useRouter } from "next/navigation";
import { BASE_URL } from "../services/helper";
import { AppTextField } from "./common";

function SignIn({ setEmail, openSignIn, setOpenSignIn, massage, setMassage, setSnackbarOpen }) {
    const [emailId, setEmailId] = useState("");
    const [password, setPassward] = useState("");
    const [openSignUp, setOpenSignUp] = useState(false);
    const router = useRouter();

    const handleClose = () => {
        setOpenSignIn(false);
    };

    return (
        <div>
            <SignUp openSignUp={openSignUp} setOpenSignUp={setOpenSignUp}></SignUp>
            <Dialog open={openSignIn} onClose={handleClose}>
                <Card className="auth-dialog-card" sx={{
                    display: 'inline-block',
                    width: { xs: 320, md: 380 },
                    padding: 3,
                }}>
                    <Stack spacing={2}>
                        <Typography variant='h5' textAlign={'center'} sx={{ fontWeight: '700', color: '#423726' }}>
                            Welcome Back
                        </Typography>
                        <Typography variant='body2' textAlign={'center'} color="text.secondary">
                            Sign in to save your credit data
                        </Typography>
                        <AppTextField
                            label='Email'
                            type="email"
                            size="medium"
                            placeholder="you@example.com"
                            onChange={(e) => setEmailId(e.target.value)}
                        />
                        <AppTextField
                            label='Password'
                            type='password'
                            size="medium"
                            placeholder="Enter your password"
                            onChange={(e) => setPassward(e.target.value)}
                        />
                        <Typography textAlign={'center'} color={'error'} sx={{ fontSize: '0.85rem', minHeight: '20px' }}>
                            {massage}
                        </Typography>
                    </Stack>
                    <CardActions sx={{ justifyContent: 'center', pt: 2, px: 0 }}>
                        <Button
                            color='primary'
                            variant='contained'
                            fullWidth
                            size="large"
                            onClick={() => {
                                fetch(`${BASE_URL}/user/signin`, {
                                    method: 'POST',
                                    body: JSON.stringify({ email: emailId, password }),
                                    headers: { 'Content-Type': 'application/json' }
                                }).then((res) => res.json()).then((data) => {
                                    setMassage(data.massage);
                                    const token = data.token;
                                    if (token) {
                                        setSnackbarOpen(true);
                                        localStorage.setItem("token", token);
                                        setEmail(data.email || emailId);
                                        handleClose();
                                    }
                                }).catch((err) => {
                                    console.error("Sign in error:", err);
                                    setMassage("Sign in failed. Check network connection.");
                                });
                            }}
                        >Sign In</Button>
                    </CardActions>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 12 }}>
                        <Typography variant="body2" textAlign={'center'} color="text.secondary">
                            Don&apos;t have an account?
                        </Typography>
                        <Button
                            sx={{ width: 120, mt: 0.5 }}
                            onClick={() => { setOpenSignUp(true); handleClose(); }}
                            size='small'
                        >Sign Up</Button>
                    </div>
                </Card>
            </Dialog>
        </div>
    );
}

export default SignIn;
