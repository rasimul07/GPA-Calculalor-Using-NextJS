'use client';
import React, { useState } from "react";
import { Button, Grid, Typography, Divider, Card } from "@mui/material";
import { Box } from "@mui/material";
import { Mauntain_Mist, Corn, Cafe_Royale } from "../Colors";
import { DialogBox } from "./FindPercentage";
import { AppTextField } from "./common";

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
                    className="calc-page-title"
                    color={"white"}
                    fontWeight={"bold"}
                    padding={1}
                    sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)', fontSize: { xs: '1.35rem', sm: '1.75rem', md: '2rem' } }}>
                    Find SGPA
                </Typography>

                <Grid container alignItems="center" justifyContent="center" className="page-shell" sx={{ px: { xs: 1, sm: 2 } }}>
                    <Grid item xs={12} md={6} lg={5}>
                        <Box className="form-card" sx={{ margin: "1.5rem 0" }}>
                            <DialogBox></DialogBox>
                            <Divider sx={{ my: '1.5rem' }}></Divider>

                            <Typography variant="h6" color={Mauntain_Mist} textAlign={'center'} sx={{ mb: 2 }}>Enter Credits Of a Semester</Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <AppTextField
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
                                <Grid item xs={6}>
                                    <AppTextField
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
                            </Grid>
                            <Button variant="contained" fullWidth size="large" sx={{ mt: 3 }} onClick={handleSubmit}>
                                Calculate SGPA
                            </Button>
                            {(formSubmitted) ? <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Card className="result-card" sx={{ width: '100%' }}>
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