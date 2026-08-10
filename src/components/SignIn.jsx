'use client';
import React, { useState } from "react";
import SignUp from './SignUp';
import { Button, Typography, Stack, TextField, Card, CardActions } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import { useRouter } from "next/navigation";
import { BASE_URL } from "../services/helper";

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
                <Card sx={{
                    display: 'inline-block',
                    width: {
                        xs: 300,
                        md: 350
                    },
                    padding: 2,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                }}>
                    <Stack>
                        <Typography variant='h5' textAlign={'center'} sx={{ fontWeight: '600', padding: '10px' }}>Log In</Typography>
                        <TextField
                            label='Email'
                            sx={{ margin: 1.5 }}
                            onChange={(e) => {
                                setEmailId(e.target.value);
                            }}
                        />
                        <TextField
                            label='Password'
                            type='password'
                            sx={{ margin: 1.5 }}
                            onChange={(e) => {
                                setPassward(e.target.value);
                            }}
                        />
                        <Typography textAlign={'center'} color={'error'} sx={{ fontSize: '14px', minHeight: '20px' }}>{massage}</Typography>
                    </Stack>
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <Button
                            color='primary'
                            variant='contained'
                            fullWidth
                            sx={{ margin: 1 }}
                            onClick={() => {
                                fetch(`${BASE_URL}/user/signin`, {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        email: emailId,
                                        password
                                    }),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }).then((res) => {
                                    return res.json();
                                }).then((data) => {
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
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
                        <Typography variant="body2" textAlign={'center'}>Don&apos;t have an account?</Typography>
                        <Button
                            style={{ width: 120, textTransform: 'none' }}
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