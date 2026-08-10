'use client';
import React, { useState } from "react";
import { Button, Grid, Typography, TextField, Divider, Card } from "@mui/material";
import { Box } from "@mui/material";
import { Mauntain_Mist, Birch, Corn, Cafe_Royale } from "../Colors";
import { DialogBox } from "./FindPercentage";

const FindSgpa = () => {
    const [sgpa, setSgpa] = useState(null);
    const [creditValuesForSgpa, setCreditValuesForSgpa] = useState(
        new Array(2).fill("")
    );
    const [isVisited, setIsVisited] = useState(
        new Array(2).fill(false)
    );
    const [checkedBeforeSubmit, setCheckedBeforeSubmit] = useState(
        new Array(2).fill(true)
    );
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleCreditValues = (index, value) => {
        const temp = [...creditValuesForSgpa];
        temp[index] = value;
        setCreditValuesForSgpa(temp);
    };

    const isVisitedHandler = (index) => {
        const temp = [...isVisited];
        temp[index] = true;
        setIsVisited(temp);
    };

    const handleSubmit = () => {
        if (creditValuesForSgpa.some((value) => value === "")) {
            alert("Please fill in all fields before submitting.");
            const temp = [...checkedBeforeSubmit];
            creditValuesForSgpa.forEach((value, index) => {
                if (value === "") {
                    temp[index] = false;
                }
            });
            setCheckedBeforeSubmit(temp);
        } else {
            const ans = (parseFloat(creditValuesForSgpa[0]) / parseFloat(creditValuesForSgpa[1]));
            setSgpa(ans.toFixed(2));
            setFormSubmitted(true);
        }
    };

    return (
        <Box
            style={{
                backgroundImage:
                    "URL(https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80)",
                backgroundSize: "cover",
                minHeight: "100vh",
                backgroundPosition: "center center",
            }}>
            <Box>
                <Typography textAlign={"center"}
                    variant="h4"
                    color={"white"}
                    fontWeight={"bold"}
                    padding={1}
                    sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                    Find SGPA
                </Typography>

                <Grid container alignItems="center" justifyContent="center" sx={{ px: 2 }}>
                    <Grid item xs={12} md={6} lg={5}>
                        <Box
                            borderRadius={3}
                            sx={{
                                padding: "2rem",
                                background: "rgba(255, 255, 255, 0.95)",
                                backdropFilter: 'blur(10px)',
                                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
                                margin: "1.5rem 0",
                            }}>
                            <DialogBox></DialogBox>
                            <Divider sx={{ my: '1.5rem' }}></Divider>

                            <Typography variant="h6" color={Mauntain_Mist} textAlign={'center'} sx={{ mb: 2 }}>Enter Credits Of a Semester</Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        required
                                        label={`Obtained credit`}
                                        onChange={(e) =>
                                            handleCreditValues(0, e.target.value)
                                        }
                                        onFocus={() => isVisitedHandler(0)}
                                        value={creditValuesForSgpa[0]}
                                        error={
                                            (creditValuesForSgpa[0] === "" && isVisited[0])
                                        }
                                        helperText={
                                            (creditValuesForSgpa[0] === "" && isVisited[0])
                                                ? "Required field"
                                                : "Obtained credit"
                                        }
                                        type="number"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        required
                                        label={`Full credit Point`}
                                        type="number"
                                        onChange={(e) =>
                                            handleCreditValues(1, e.target.value)
                                        }
                                        onFocus={() => isVisitedHandler(1)}
                                        value={creditValuesForSgpa[1]}
                                        error={
                                            (creditValuesForSgpa[1] === "" && isVisited[1])
                                        }
                                        helperText={
                                            (creditValuesForSgpa[1] === "" && isVisited[1])
                                                ? "Required field"
                                                : "Full credit points"
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Button variant="contained" fullWidth sx={{ mt: 3, py: 1 }} style={{ backgroundColor: Cafe_Royale }} onClick={handleSubmit}>
                                Calculate SGPA
                            </Button>
                            {(formSubmitted) ? <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Card sx={{ p: 2, backgroundColor: Corn, width: '100%', textAlign: 'center' }}>
                                    <Typography fontWeight={'bold'} color={'white'}>
                                        Your SGPA is: {sgpa}
                                    </Typography>
                                </Card> </Box> : null}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default FindSgpa;