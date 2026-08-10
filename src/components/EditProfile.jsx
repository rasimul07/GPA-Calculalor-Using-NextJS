'use client';
import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, TextField, Divider } from "@mui/material";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Mauntain_Mist, Light_Gray, Birch, Corn, Cafe_Royale } from "../Colors";
import "../index.css";
import { DialogBox } from "./FindPercentage";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "../services/helper";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { MyBackDrop } from "./Profile";

const EditProfile = ({ email, setEmail }) => {
    return (
        <CustomProfile email={email} setEmail={setEmail}></CustomProfile>
    );
};

const CustomProfile = ({ email, setEmail }) => {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState({});
    const [numOfSemester, setNumOfSemester] = useState(1);
    const [arrayOfSems, setArrayOfSems] = useState(
        new Array(numOfSemester).fill().map((_, index) => index + 1)
    );
    const [creditValues, setCreditValues] = useState(
        new Array(numOfSemester * 2).fill("")
    );
    const [isVisited, setIsVisited] = useState(
        new Array(numOfSemester).fill(false)
    );
    const [checkedBeforeSubmit, setCheckedBeforeSubmit] = useState(
        new Array(numOfSemester).fill(true)
    );

    useEffect(() => {
        const func = async () => {
            const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
            if (!token || token === 'null') return;
            try {
                const response = await axios.get(`${BASE_URL}/user/getUserInfo`, {
                    headers: {
                        authorization: "Bearer " + token
                    }
                });
                if (response.data) {
                    setUserInfo(response.data);
                    const credits = response.data.credits || [];
                    const noSem = credits.length ? credits.length / 2 : 1;
                    setNumOfSemester(noSem);
                    setArrayOfSems(new Array(noSem).fill().map((_, index) => index + 1));
                    setCreditValues([...credits]);
                }
            } catch (err) {
                console.error("Error fetching user info:", err);
            }
        };
        func();
    }, [email]);

    const handleChange = (e) => {
        const curr = e.target.value;
        setNumOfSemester(curr);
        setArrayOfSems(new Array(curr).fill().map((_, index) => index + 1));
        const len = creditValues.length / 2;
        const temp = [...creditValues];
        let count = Math.abs(len - curr) * 2;
        if (len < curr) {
            while (count) {
                temp.push("");
                count = count - 1;
            }
        } else {
            while (count) {
                temp.pop();
                count = count - 1;
            }
        }
        setCreditValues(temp);
        setIsVisited(new Array(curr * 2).fill(false));
    };

    const handleCreditValues = (index, value) => {
        const temp = [...creditValues];
        temp[index] = value;
        setCreditValues(temp);
    };

    const isVisitedHandler = (index) => {
        const temp = [...isVisited];
        temp[index] = true;
        setIsVisited(temp);
    };

    const handleSubmit = () => {
        if (creditValues.some((value) => value === "")) {
            alert("Please fill in all TextFields before submitting.");
            const temp = [...checkedBeforeSubmit];
            creditValues.forEach((value, index) => {
                if (value === "") {
                    temp[index] = false;
                }
            });
            setCheckedBeforeSubmit(temp);
        } else {
            const func = async () => {
                const body = {
                    credits: creditValues,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    contact: userInfo.contact,
                    email: userInfo.email,
                    password: userInfo.password
                };
                try {
                    const token = localStorage.getItem("token");
                    const response = await axios.put(`${BASE_URL}/user/updateUserInfo`,
                        body, {
                        headers: {
                            authorization: "Bearer " + token
                        }
                    });

                    if (response.status === 200) {
                        alert("Saved Successfully");
                        router.push('/profile');
                    }
                }
                catch (error) {
                    console.error("Update user info error:", error);
                    alert("Failed to save changes.");
                }
            };
            func();
        }
    };

    return (
        <Box overflow={'auto'} sx={{ minHeight: '100vh', background: Corn }} >
            <Box style={{
                backgroundImage:
                    "URL(https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80)",
                backgroundSize: "cover",
                minHeight: "100vh",
                backgroundPosition: "center center",
            }}>
                <Box>
                    <Typography
                        textAlign={"center"}
                        variant="h4"
                        color={"white"}
                        fontWeight={"bold"}
                        padding={2}
                        sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                        Edit Profile
                    </Typography>
                    {(Object.keys(userInfo).length === 0 && email) ? <MyBackDrop></MyBackDrop> : null}
                    <Box
                        borderRadius={3}
                        sx={{
                            padding: "1.5rem",
                            background: "rgba(255, 255, 255, 0.95)",
                            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
                            margin: "1.5rem",
                        }}>
                        <Grid container spacing={3} mb={2}>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography fontSize={'0.9rem'} p={0.5} fontWeight="500">First Name:</Typography>
                                <TextField size="small" fullWidth value={userInfo.firstName || ''} onChange={(e) => {
                                    setUserInfo({ ...userInfo, firstName: e.target.value });
                                }}></TextField>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography fontSize={'0.9rem'} p={0.5} fontWeight="500">Last Name:</Typography>
                                <TextField size="small" fullWidth value={userInfo.lastName || ''} onChange={(e) => {
                                    setUserInfo({ ...userInfo, lastName: e.target.value });
                                }}></TextField>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography fontSize={'0.9rem'} p={0.5} fontWeight="500">Phone No:</Typography>
                                <TextField size="small" fullWidth type="number" value={userInfo.contact || ''} onChange={(e) => {
                                    setUserInfo({ ...userInfo, contact: e.target.value });
                                }}></TextField>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography fontSize={'0.9rem'} p={0.5} fontWeight="500">Email Id:</Typography>
                                <TextField size="small" fullWidth value={userInfo.email || ''} onChange={(e) => {
                                    setUserInfo({ ...userInfo, email: e.target.value });
                                }}></TextField>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography fontSize={'0.9rem'} p={0.5} fontWeight="500">Password:</Typography>
                                <PasswordField password={userInfo.password || ''} userInfo={userInfo} setUserInfo={setUserInfo}></PasswordField>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography fontSize={'0.9rem'} p={0.5} fontWeight="500">Select no of semester:</Typography>
                                <FormControl size="small" fullWidth>
                                    <InputLabel id="select-no-of-sems">No of sems</InputLabel>
                                    <Select
                                        labelId="select-no-of-sems"
                                        value={numOfSemester || 1}
                                        label="No of sems"
                                        onChange={handleChange}>
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                            <MenuItem key={n} value={n}>{n}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ background: Corn, pb: 4 }}>
                <Grid container justifyContent="center">
                    <Grid item xs={11} md={10}>
                        <Box
                            borderRadius={3}
                            sx={{
                                padding: "1.5rem",
                                background: "white",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                                margin: "1.5rem 0",
                            }}
                        >
                            <Typography textAlign={'center'} variant="h5" fontWeight="600">Edit Your Credit Points</Typography>
                            <Divider sx={{ my: 2 }}></Divider>
                            <DialogBox></DialogBox>

                            <Grid container spacing={3} mt={1}>
                                {arrayOfSems.map((item, index) => (
                                    <Grid
                                        key={item}
                                        item
                                        xs={12}
                                        md={6}
                                    >
                                        <Box sx={{
                                            background: Light_Gray,
                                            borderRadius: '10px',
                                            p: 2,
                                            boxShadow: `0px 0px 2px 0px rgba(0,0,0,0.2)`
                                        }}>
                                            <Typography
                                                fontWeight={"bold"}
                                                pb={1}
                                                textTransform={"uppercase"}
                                                color={Mauntain_Mist}>
                                                For semester {item}:
                                            </Typography>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        required
                                                        label={`Obtained credit`}
                                                        onChange={(e) =>
                                                            handleCreditValues(index * 2, e.target.value)
                                                        }
                                                        onFocus={() => isVisitedHandler(index * 2)}
                                                        value={creditValues[index * 2] || ""}
                                                        error={
                                                            (creditValues[index * 2] === "" && isVisited[index * 2])
                                                        }
                                                        helperText={
                                                            (creditValues[index * 2] === "" && isVisited[index * 2])
                                                                ? "Required field"
                                                                : "Obtained credit"
                                                        }
                                                        type="number"
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        required
                                                        label={`Full credit Point`}
                                                        type="number"
                                                        onChange={(e) =>
                                                            handleCreditValues(index * 2 + 1, e.target.value)
                                                        }
                                                        onFocus={() => isVisitedHandler(index * 2 + 1)}
                                                        value={creditValues[index * 2 + 1] || ""}
                                                        error={
                                                            (creditValues[index * 2 + 1] === "" && isVisited[index * 2 + 1])
                                                        }
                                                        helperText={
                                                            (creditValues[index * 2 + 1] === "" && isVisited[index * 2 + 1])
                                                                ? "Required field"
                                                                : "Full credit"
                                                        }
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                    <Button variant="contained" size="large" sx={{ background: Cafe_Royale, px: 4, py: 1 }} onClick={handleSubmit} >Save Changes</Button>
                </Box>
            </Box>
        </Box>
    );
};

const PasswordField = ({ password, userInfo, setUserInfo }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <FormControl variant="outlined" size="small" fullWidth>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password || ''}
                onChange={(e) => {
                    setUserInfo({ ...userInfo, password: e.target.value });
                }}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
};

export default EditProfile;