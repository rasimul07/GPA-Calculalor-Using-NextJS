'use client';
import React, { useState } from "react";
import { Button, Grid, Typography, TextField, Card, Divider } from "@mui/material";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Mauntain_Mist, Birch, Corn, Cafe_Royale } from "../Colors";
import { DialogBox } from "./FindPercentage";
import "../index.css";
import axios from "axios";
import { BASE_URL } from "../services/helper";

const FindYgpa = ({ email, setEmail }) => {
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

    const handleFetchData = () => {
        const func = async () => {
            const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
            if (!token || token === 'null') {
                alert("Login required to fetch profile data");
                return;
            }
            try {
                const response = await axios.get(`${BASE_URL}/user/getUserInfo`, {
                    headers: {
                        authorization: "Bearer " + token
                    }
                });
                if (response.data) {
                    setUserInfo(response.data);
                    const credits = response.data.credits || [];
                    const noSem = credits.length / 2;
                    const years = Math.floor(noSem / 2) || 1;
                    setArrayOfYears(new Array(years).fill().map((_, index) => index + 1));
                    setArrayOfSems([1, 2]);
                    if (credits.length >= 4) {
                        setCreditValuesForYgpa(credits.slice(0, 4));
                    }
                    setIsLogin(true);
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                alert("Failed to fetch profile data. Please make sure you are signed in.");
            }
        };
        func();
    };

    const handleChange = (e) => {
        const curr = e.target.value;
        setWhichYear(curr);
        const credits = userInfo.credits || [];
        const startInd = (curr - 1) * 4;
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
            let obcredit = 0;
            let total_full_credit = 0;
            creditValuesForYgpa.forEach((value, index) => {
                if (index % 2 === 0) {
                    obcredit = obcredit + parseFloat(value);
                } else {
                    total_full_credit = total_full_credit + parseFloat(value);
                }
            });
            const calcYgpa = (obcredit / total_full_credit);
            setYgpa(calcYgpa.toFixed(2));
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
                    Find YGPA
                </Typography>

                <Box
                    borderRadius={3}
                    sx={{
                        padding: "2rem",
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: 'blur(10px)',
                        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
                        margin: "1.5rem auto",
                        maxWidth: "800px"
                    }}>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item>
                            <Button onClick={handleFetchData} variant="outlined" sx={{ color: 'black', borderColor: 'black' }}>Use Your Profile Data</Button>
                        </Grid>
                        <Grid item>
                            <DialogBox></DialogBox>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 2 }}></Divider>
                    <Box>
                        {isLogin ? (
                            <Box mb={2}>
                                <Typography fontSize={'1.1rem'} fontWeight="500" mb={1}>Select year to calculate:</Typography>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="year-select-label">Year</InputLabel>
                                    <Select
                                        labelId="year-select-label"
                                        value={whichYear}
                                        label="Year"
                                        onChange={handleChange}
                                    >
                                        {arrayOfYears.map((v) => (
                                            <MenuItem key={v} value={v}>Year {v}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
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
                                        For semester {item}:
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="outlined"
                                                fullWidth
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
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="outlined"
                                                fullWidth
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
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Button variant="contained" size="large" style={{ backgroundColor: Cafe_Royale }} onClick={handleSubmit}>
                            Calculate YGPA
                        </Button>
                        {formSubmitted ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, width: '100%' }}>
                                <Card sx={{ p: 2, backgroundColor: Corn, width: '100%', textAlign: 'center' }}>
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
