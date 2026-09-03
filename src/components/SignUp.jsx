'use client';
import React, { useState } from "react";
import { Button, Typography, Stack, Card, CardActions } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import { BASE_URL } from "../services/helper";
import { AppTextField } from "./common";

function SignUp({ openSignUp, setOpenSignUp }) {
    const [massage, setMassage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassward] = useState("");

    const handleClose = () => {
        setOpenSignUp(false);
    };

    return (
        <div>
            <Dialog open={openSignUp} onClose={handleClose}>
                <Card className="auth-dialog-card" sx={{
                    display: 'inline-block',
                    width: { xs: 320, md: 380 },
                    padding: 3,
                }}>
                    <Stack spacing={2}>
                        <Typography variant='h5' textAlign={'center'} sx={{ fontWeight: '700', color: '#423726' }}>
                            Create Account
                        </Typography>
                        <Typography variant='body2' textAlign={'center'} color="text.secondary">
                            Join to track your GPA progress
                        </Typography>
                        <AppTextField
                            label='Email'
                            type="email"
                            size="medium"
                            placeholder="you@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <AppTextField
                            label='Password'
                            type='password'
                            size="medium"
                            placeholder="Choose a password"
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
                                fetch(`${BASE_URL}/user/signup`, {
                                    method: 'POST',
                                    body: JSON.stringify({ email, password }),
                                    headers: { 'Content-Type': 'application/json' }
                                }).then((res) => res.json()).then((data) => {
                                    setMassage(data.massage);
                                    const token = data.token;
                                    if (token) {
                                        localStorage.setItem("token", token);
                                        setTimeout(() => handleClose(), 1000);
                                    }
                                }).catch((err) => {
                                    console.error("Sign up error:", err);
                                    setMassage("Sign up failed.");
                                });
                            }}
                        >Sign Up</Button>
                    </CardActions>
                </Card>
            </Dialog>
        </div>
    );
}

export default SignUp;
