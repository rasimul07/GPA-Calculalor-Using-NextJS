'use client';
import React, { useState } from "react";
import { Button, Grid, Typography, Card, Divider, Stack } from "@mui/material";
import { Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Mauntain_Mist } from "../Colors";
import { DialogBox } from "./FindPercentage";
import "../index.css";
import { AppTextField, AppSelect, ProfileDataButton } from "./common";
import { calculateYgpaFromYearCredits } from "../utils/gpaCalculations";

const FindYgpa = () => {
    const [userInfo, setUserInfo] = useState({});
    const [whichYear, setWhichYear] = useState(1);
    const [arrayOfYears, setArrayOfYears] = useState([1]);
    const [isLogin, setIsLogin] = useState(false);
    const [arrayOfSems, setArrayOfSems] = useState(
        new Array(2).fill().map((_, index) => index + 1)
    );
    const [creditValuesForYgpa, setCreditValuesForYgpa] = useState(
        new Array(4).fill("")
    );
    const [isVisited, setIsVisited] = useState(
        new Array(4).fill(false)
    );
    const [checkedBeforeSubmit, setCheckedBeforeSubmit] = useState(
        new Array(4).fill(true)
    );
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [ygpa, setYgpa] = useState(null);

    const handleProfileLoaded = (data) => {
        setUserInfo(data);
        const credits = data.credits || [];
        const breakdownYears = data.breakdown?.years || [];
        const years = breakdownYears.length
            ? breakdownYears.map((row) => row.year)
            : new Array(Math.floor(credits.length / 4) || 1).fill().map((_, index) => index + 1);
        setArrayOfYears(years);
        setWhichYear(years[0] ?? 1);
        setArrayOfSems([years[0] * 2 - 1, years[0] * 2]);
        if (credits.length >= 4) {
            setCreditValuesForYgpa(credits.slice(0, 4));
        }
        setIsLogin(true);
        setFormSubmitted(false);
    };

    const handleChange = (e) => {
        const curr = e.target.value;
        setWhichYear(curr);
        const credits = userInfo.credits || [];
        const yearIndex = arrayOfYears.indexOf(curr);
        const startInd = yearIndex >= 0 ? yearIndex * 4 : (curr - 1) * 4;
        const temp = [];
        for (let i = startInd; i < startInd + 4; i++) {
            temp.push(credits[i] || "");
        }
        setCreditValuesForYgpa(temp);
        setArrayOfSems([2 * curr - 1, 2 * curr]);
    };

    const handleCreditValues = (index, value) => {
        const temp = [...creditValuesForYgpa];
        temp[index] = value;
        setCreditValuesForYgpa(temp);
    };

    const isVisitedHandler = (index) => {
        const temp = [...isVisited];
        temp[index] = true;
        setIsVisited(temp);
    };

    const handleSubmit = () => {
        if (creditValuesForYgpa.some((value) => value === "")) {
            alert("Please fill in all fields before submitting.");
            const temp = [...checkedBeforeSubmit];
            creditValuesForYgpa.forEach((value, index) => {
                if (value === "") {
                    temp[index] = false;
                }
            });
            setCheckedBeforeSubmit(temp);
        } else {
            const calcYgpa = calculateYgpaFromYearCredits(creditValuesForYgpa);
            setYgpa(calcYgpa);
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
                    Find YGPA
                </Typography>

                <Box className="form-card page-shell" sx={{ margin: { xs: '0.75rem auto', sm: '1.5rem auto' }, maxWidth: "800px" }}>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <ProfileDataButton onLoaded={handleProfileLoaded} />
                        <DialogBox inline />
                    </Stack>
                    <Divider sx={{ my: 2 }}></Divider>
                    <Box>
                        {isLogin ? (
                            <Box mb={2}>
                                <Typography fontSize={'1.1rem'} fontWeight="500" mb={1}>Select year to calculate:</Typography>
                                <AppSelect
                                    label="Year"
                                    labelId="year-select-label"
                                    value={whichYear}
                                    onChange={handleChange}
                                >
                                        {arrayOfYears.map((v) => (
                                            <MenuItem key={v} value={v}>Year {v}</MenuItem>
                                        ))}
                                </AppSelect>
                            </Box>
                        ) : null}

                        <Grid container spacing={3}>
                            {arrayOfSems.map((item, index) => (
                                <Grid
                                    key={item}
                                    item
                                    xs={12}
                                    md={6}>
                                    <Typography
                                        fontWeight={"bold"}
                                        padding={1}
                                        textTransform={"uppercase"}
                                        color={Mauntain_Mist}>
                                        For semester {item%2 === 0? 'Even': 'Odd'}:
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <AppTextField
                                                required
                                                label={`Full credit Point`}
                                                type="number"
                                                onChange={(e) =>
                                                    handleCreditValues(index * 2 + 1, e.target.value)
                                                }
                                                onFocus={() => isVisitedHandler(index * 2 + 1)}
                                                value={creditValuesForYgpa[index * 2 + 1] || ""}
                                                error={
                                                    (creditValuesForYgpa[index * 2 + 1] === "" && isVisited[index * 2 + 1])
                                                }
                                                helperText={
                                                    (creditValuesForYgpa[index * 2 + 1] === "" && isVisited[index * 2 + 1])
                                                        ? "Required field"
                                                        : "Full credit"
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <AppTextField
                                                required
                                                label={`Obtained credit`}
                                                onChange={(e) =>
                                                    handleCreditValues(index * 2, e.target.value)
                                                }
                                                onFocus={() => isVisitedHandler(index * 2)}
                                                value={creditValuesForYgpa[index * 2] || ""}
                                                error={
                                                    (creditValuesForYgpa[index * 2] === "" && isVisited[index * 2])
                                                }
                                                helperText={
                                                    (creditValuesForYgpa[index * 2] === "" && isVisited[index * 2])
                                                        ? "Required field"
                                                        : "Obtained credit"
                                                }
                                                type="number"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Button variant="contained" size="large" onClick={handleSubmit}>
                            Calculate YGPA
                        </Button>
                        {formSubmitted ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, width: '100%' }}>
                                <Card className="result-card" sx={{ width: '100%' }}>
                                    <Typography fontWeight={'bold'} color={'white'}>
                                        Your YGPA is: {ygpa}
                                    </Typography>
                                </Card>
                            </Box>
                        ) : null}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default FindYgpa;
