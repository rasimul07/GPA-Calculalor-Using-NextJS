'use client';
import React, { useState } from "react";
import { Typography, Box, Alert, Stack } from "@mui/material";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import { DGPAProvider, useDGPA } from '../../context/dgpaContext.jsx';
import { validateCredits } from '../../utils/gpaCalculations';
import { ProfileDataButton } from '../common';

const steps = [
    {
        label: 'Select the number of years in your degree program',
        description: 'Choose your degree duration. For 4-year courses, you can mark lateral entry to skip Year 1.',
    },
    {
        label: 'Enter credit scores for each semester',
        description: 'Enter obtained and full credit points for each semester. YGPA will be calculated per year.',
    },
    {
        label: 'Calculate DGPA',
        description: 'Review your yearly YGPAs and see your final Degree Grade Point Average.',
    },
];

const FindDgpaWizard = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [stepError, setStepError] = useState("");
    const {
        creditValues,
        computeAndStoreYgpas,
        computeAndStoreDgpa,
        resetAll,
        dgpa,
        loadFromProfile,
    } = useDGPA();

    const continueButtonRef = React.useRef(null);
    const backButtonRef = React.useRef(null);
    const resetButtonRef = React.useRef(null);
    const previousActiveStepRef = React.useRef(activeStep);

    React.useEffect(() => {
        const previousActiveStep = previousActiveStepRef.current;
        previousActiveStepRef.current = activeStep;

        if (previousActiveStep < activeStep) {
            if (activeStep === steps.length) {
                resetButtonRef.current?.focus();
            } else {
                continueButtonRef.current?.focus();
            }
            return;
        }

        if (activeStep === 0) {
            continueButtonRef.current?.focus();
            return;
        }

        backButtonRef.current?.focus();
    }, [activeStep]);

    const handleNext = () => {
        setStepError("");

        if (activeStep === 1) {
            const validation = validateCredits(creditValues);
            if (!validation.valid) {
                setStepError(validation.message);
                return;
            }
            computeAndStoreYgpas();
        }

        if (activeStep === 2) {
            const ygpas = computeAndStoreYgpas();
            computeAndStoreDgpa(ygpas);
        }

        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setStepError("");
        setActiveStep((prev) => prev - 1);
    };

    const handleReset = () => {
        resetAll();
        setStepError("");
        setActiveStep(0);
    };

    const handleProfileLoaded = (data) => {
        setStepError("");
        loadFromProfile(data);
        setActiveStep(1);
    };

    return (
        <Box
            sx={{
                backgroundImage:
                    'url(https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                minHeight: '100vh',
            }}
        >
            <Typography
                textAlign="center"
                variant="h4"
                className="calc-page-title"
                color="white"
                fontWeight="bold"
                padding={1}
                sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)', fontSize: { xs: '1.35rem', sm: '1.75rem', md: '2rem' } }}
            >
                Find DGPA
            </Typography>

            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                alignItems="center"
                justifyContent="center"
                sx={{ px: 2, mb: 1 }}
            >
                <ProfileDataButton onLoaded={handleProfileLoaded} onError={setStepError} />
            </Stack>

            <Box
                className="form-card page-shell"
                sx={{
                    maxWidth: activeStep === 1 ? 800 : 520,
                    margin: { xs: '0.75rem auto', sm: '1.5rem auto' },
                    mt: 2,
                    mb: 4,
                    transition: 'max-width 0.3s ease',
                }}
            >
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                            <Step key={step.label}>
                                <StepLabel
                                    optional={
                                        index === steps.length - 1 ? (
                                            <Typography variant="caption">Last step</Typography>
                                        ) : null
                                    }
                                >
                                    {step.label}
                                </StepLabel>
                                <StepContent>
                                    <Typography sx={{ mb: 1 }}>{step.description}</Typography>
                                    {index === 0 && <Step1 />}
                                    {index === 1 && <Step2 onValidationError={setStepError} />}
                                    {index === 2 && <Step3 />}

                                    {stepError && index === activeStep && (
                                        <Alert severity="error" sx={{ mt: 1, mb: 1 }}>
                                            {stepError}
                                        </Alert>
                                    )}

                                    <Box sx={{ mb: 2 }}>
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                            ref={continueButtonRef}
                                        >
                                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                        </Button>
                                        {index !== 0 && (
                                            <Button
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                                ref={backButtonRef}
                                            >
                                                Back
                                            </Button>
                                        )}
                                    </Box>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>

                    {activeStep === steps.length && (
                        <Paper square elevation={0} sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Calculation complete
                            </Typography>
                            <Typography sx={{ mb: 2 }}>
                                Your final DGPA is <strong>{dgpa}</strong>
                            </Typography>
                            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }} ref={resetButtonRef}>
                                Calculate Again
                            </Button>
                        </Paper>
                    )}
                </Box>
        </Box>
    );
};

const FindDgpa = () => (
    <DGPAProvider>
        <FindDgpaWizard />
    </DGPAProvider>
);

export default FindDgpa;
