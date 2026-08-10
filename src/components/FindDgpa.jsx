'use client';
import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Birch } from "../Colors";

const FindDgpa = () => {
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
                <Typography textAlign={"center"}
                    variant="h4"
                    color={"white"}
                    fontWeight={"bold"}
                    padding={1}
                    sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                    Find DGPA
                </Typography>

                <Box
                    borderRadius={3}
                    sx={{
                        padding: "2rem",
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: 'blur(10px)',
                        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
                        margin: "2rem auto",
                        maxWidth: '600px',
                        textAlign: 'center'
                    }}>
                    <Typography variant="h6">DGPA Calculator feature coming soon!</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default FindDgpa;