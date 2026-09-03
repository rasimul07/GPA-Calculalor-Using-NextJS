'use client';
import React, { useState, useEffect } from "react";
import {
    Button,
    Grid,
    Typography,
    Divider,
} from "@mui/material";
import { Box } from "@mui/material";
import { Birch, Cafe_Royale } from "../Colors";
import "../index.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { BASE_URL } from "../services/helper";
import { calculateDgpa } from "../utils/gpaCalculations";

const Profile = ({ email, setEmail }) => {
    return (
        <Box>
            <ViewProfile email={email} setEmail={setEmail}></ViewProfile>
        </Box>
    );
};

const calculateYgpas = (creditScores) => {
    if (!creditScores) return [];
    let obcredit = 0;
    let total_full_credit = 0;
    const temp = [];

    creditScores.forEach((value, index) => {
        if (index % 2 === 0) {
            obcredit = obcredit + parseFloat(value);
        } else {
            total_full_credit = total_full_credit + parseFloat(value);
        }
        if (index % 4 === 3) {
            const ygpa = (obcredit / total_full_credit);
            temp.push(ygpa.toFixed(2));
            obcredit = 0;
            total_full_credit = 0;
        }
    });

    return temp;
};

const calculateSgpas = (creditScores) => {
    if (!creditScores) return [];
    const temp = [];
    creditScores.forEach((value, index) => {
        if (index % 2 === 0) {
            const sgpa = (value / creditScores[index + 1]);
            temp.push(sgpa.toFixed(2));
        }
    });
    return temp;
};

const ViewProfile = ({ email, setEmail }) => {
    const router = useRouter();

    const [creditScores, setCreditScores] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [arrayOfYgpas, setArrayOfYgpas] = useState([]);
    const [arrayOfSgpas, setArrayOfSgpas] = useState([]);
    const [dgpa, setDgpa] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const func = async () => {
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
            if (!token || token === 'null') {
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`${BASE_URL}/user/getUserInfo`, {
                    headers: {
                        'authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.data) {
                    setUserInfo(response.data);
                    const credits = response.data.credits || [];
                    setCreditScores(credits);
                    const temp = calculateYgpas(credits);
                    setArrayOfYgpas(temp);
                    const temp2 = calculateSgpas(credits);
                    setArrayOfSgpas(temp2);
                    const temp3 = calculateDgpa(temp, temp.length, false);
                    setDgpa(temp3);
                }
            } catch (error) {
                console.error("Profile fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        func();
    }, [email]);

    return (
        <Box
            style={{
                backgroundImage:
                    "URL(https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80)",
                backgroundSize: "cover",
                minHeight: "100vh",
                backgroundPosition: "center center",
            }}>
            <Box height={"5rem"}></Box>
            <Box>
                <Typography
                    textAlign={"center"}
                    variant="h4"
                    color={"white"}
                    fontWeight={"bold"}
                    padding={2}
                    sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                    Profile
                </Typography>
                {loading ? <MyBackDrop /> : null}

                <Grid container spacing={3} justifyContent="center" sx={{ px: 2 }}>
                    <Grid item md={8} xs={12}>
                        <Box
                            borderRadius={3}
                            sx={{
                                padding: "2rem",
                                background: "rgba(255, 255, 255, 0.9)",
                                backdropFilter: 'blur(10px)',
                                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
                                margin: "1rem 0",
                            }}>
                            <Typography variant="body1" sx={{ py: 0.5 }}>
                                <span style={{ fontWeight: "bold" }}>Name:</span> {userInfo.firstName || ''}{" "}
                                {userInfo.lastName || ''}{" "}
                            </Typography>
                            <Typography variant="body1" sx={{ py: 0.5 }}>
                                <span style={{ fontWeight: "bold" }}>Email Id: </span> {userInfo.email || email || ''}{" "}
                            </Typography>
                            <Typography variant="body1" sx={{ py: 0.5 }}>
                                <span style={{ fontWeight: "bold" }}>Phone No:</span> {userInfo.contact || 'N/A'}{" "}
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography fontWeight={"bold"} textTransform={"uppercase"} textAlign={'center'} p={1}>
                                Semester Results
                            </Typography>
                            <Box overflow={'auto'}>
                                <table border={1} width={"100%"} style={{ borderCollapse: 'collapse', borderColor: '#ccc' }}>
                                    <thead>
                                        <tr style={{ background: '#f5f5f5' }}>
                                            <th style={{ padding: '8px' }}>Semester</th>
                                            <th style={{ padding: '8px' }}>Full Credit</th>
                                            <th style={{ padding: '8px' }}>Obtained Credit</th>
                                            <th style={{ padding: '8px' }}>SGPA</th>
                                            <th style={{ padding: '8px' }}>YGPA</th>
                                            <th style={{ padding: '8px' }}>DGPA</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {creditScores && creditScores.map((crd, index) => (
                                            <React.Fragment key={index}>
                                                {(index % 2 === 0) ?
                                                    <tr>
                                                        <td style={{ textAlign: 'center', padding: '6px' }}>{index / 2 + 1}</td>
                                                        <td style={{ textAlign: 'center', padding: '6px' }}>{creditScores[index + 1]}</td>
                                                        <td style={{ textAlign: 'center', padding: '6px' }}>{crd}</td>
                                                        <td style={{ textAlign: 'center', padding: '6px' }}>{arrayOfSgpas[index / 2]}</td>
                                                        {(index % 4 === 0) ? <td style={{ textAlign: 'center', padding: '6px' }} rowSpan={2}>{arrayOfYgpas[index / 4]}</td> : null}
                                                        {(index === 0) ? <td style={{ textAlign: 'center', padding: '6px' }} rowSpan={arrayOfSgpas.length}>{dgpa}</td> : null}
                                                    </tr>
                                                    : null}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                sx={{ color: "white", background: Cafe_Royale, m: '1.5rem', py: 1.5, px: 3, fontWeight: 'bold' }}
                                onClick={() => {
                                    router.push('/editProfile');
                                }}>
                                Edit Profile
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export const MyBackDrop = () => {
    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default Profile;
