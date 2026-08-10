'use client';
import React, { useState } from "react";
import { Button, Typography, Stack, TextField, Card, CardActions } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import { BASE_URL } from "../services/helper";

function SignUp({ openSignUp, setOpenSignUp }) {
    const [massage, setMassage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassward] = useState("");

    const handleClose = () => {
        setOpenSignUp(false);
    };

    return (
        <div>
            <Dialog open={openSignUp} onClose={handleClose} >
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
                        <Typography variant='h5' textAlign={'center'} sx={{ fontWeight: '600', padding: '10px' }}>Sign Up</Typography>
                        <TextField
                            label='Email'
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            sx={{ margin: 1.5 }}>
                        </TextField>
                        <TextField
                            label='Password'
                            type='password'
                            onChange={(e) => {
                                setPassward(e.target.value);
                            }}
                            sx={{ margin: 1.5 }}>
                        </TextField>
                        <Typography textAlign={'center'} color={'error'} sx={{ fontSize: '14px', minHeight: '20px' }}>{massage}</Typography>
                    </Stack>
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <Button
                            color='primary'
                            variant='contained'
                            fullWidth
                            sx={{ margin: 1 }}
                            onClick={() => {
                                fetch(`${BASE_URL}/user/signup`, {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        email,
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
                                        localStorage.setItem("token", token);
                                        setTimeout(() => {
                                            handleClose();
                                        }, 1000);
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