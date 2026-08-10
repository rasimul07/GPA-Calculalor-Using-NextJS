'use client';
import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Birch } from "../Colors";
import "../index.css";
import { forAniPages } from "./Appbar";

const HomePage = () => {
    return (
        <div>
            <PagesAnimation forAniPages={forAniPages}></PagesAnimation>
        </div>
    );
};

const PagesAnimation = ({ forAniPages }) => {
    const [word, setWord] = useState(forAniPages[0]);

    useEffect(() => {
        let i = 0;
        let temp = forAniPages[i];
        let len = temp.length;
        const timer = setInterval(() => {
            if (len === -1) {
                i++;
                if (i === forAniPages.length) {
                    i = 0;
                }
                temp = forAniPages[i];
                len = temp.length;
            }
            let w = temp.substring(0, len);
            len = len - 1;
            setWord(w);
        }, 300);

        return () => clearInterval(timer);
    }, [forAniPages]);

    return (
        <div
            style={{
                backgroundImage:
                    "URL(https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80)",
                backgroundSize: "cover",
                height: "100vh",
                backgroundPosition: "center center",
            }}>
            <Box style={{ height: "100vh" }}>
                <Box
                    component={"div"}
                    padding={2}
                    style={{ textShadow: "4px 4px 7px black" }}
                    sx={{
                        position: "absolute",
                        top: {
                            md: "45vh",
                            xs: "45vh",
                        },
                        left: {
                            md: "40vw",
                            xs: "5vw",
                        },
                    }}>
                    <Typography
                        variant={"h3"}
                        fontWeight={"bold"}
                        textTransform={"uppercase"}
                        color={"white"}
                        sx={{
                            fontSize: {
                                xs: "2.5rem",
                                md: "3.5rem"
                            },
                        }}>
                        Find
                    </Typography>
                    <Box
                        sx={{
                            display: "inline-block",
                            height: "3.8rem",
                            border: 8,
                            borderRightColor: Birch,
                            borderLeft: "none",
                            borderTop: "none",
                            borderBottom: "none",
                        }}>
                        <Typography
                            variant={"h3"}
                            fontWeight={"bold"}
                            textTransform={"uppercase"}
                            color={"white"}
                            sx={{
                                fontSize: {
                                    xs: "2.5rem",
                                    md: "3.5rem"
                                },
                            }}>
                            {word}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default HomePage;