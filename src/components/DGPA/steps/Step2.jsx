'use client';
import React, { useState } from "react";
import { Button, Grid, Typography, Divider, Stack, Card } from "@mui/material";
import { Box } from "@mui/material";
import axios from "axios";
import { Mauntain_Mist } from "../../../Colors";
import { DialogBox } from "../../FindPercentage";
import { AppTextField } from "../../common";
import { useDGPA } from "../../../context/dgpaContext.jsx";
import { BASE_URL } from "../../../services/helper";
import {
  getActiveYearLabels,
} from "../../../utils/gpaCalculations";

const Step2 = ({ onValidationError }) => {
  const {
    courseYears,
    isLateralEntry,
    creditValues,
    setCreditValues,
    ygpas,
    computeAndStoreYgpas,
  } = useDGPA();

  const [isVisited, setIsVisited] = useState(
    new Array(creditValues.length).fill(false)
  );
  const [previewYgpas, setPreviewYgpas] = useState([]);

  const yearLabels = getActiveYearLabels(courseYears, isLateralEntry);

  const handleCreditChange = (index, value) => {
    const temp = [...creditValues];
    temp[index] = value;
    setCreditValues(temp);
  };

  const isVisitedHandler = (index) => {
    const temp = [...isVisited];
    temp[index] = true;
    setIsVisited(temp);
  };

  const handleFetchProfile = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token || token === "null") {
      onValidationError?.("Login required to fetch profile data.");
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/user/getUserInfo`, {
        headers: { authorization: "Bearer " + token },
      });

      if (response.data?.credits?.length) {
        const credits = response.data.credits;
        const needed = creditValues.length;
        const sliceStart = courseYears === 4 && isLateralEntry ? 4 : 0;
        const sliced = credits.slice(sliceStart, sliceStart + needed);
        const padded = [...sliced];
        while (padded.length < needed) padded.push("");
        setCreditValues(padded.slice(0, needed));
        onValidationError?.("");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      onValidationError?.("Failed to fetch profile data. Please sign in and try again.");
    }
  };

  const handlePreviewYgpas = () => {
    const computed = computeAndStoreYgpas();
    setPreviewYgpas(computed);
  };

  React.useEffect(() => {
    setIsVisited(new Array(creditValues.length).fill(false));
    setPreviewYgpas([]);
  }, [creditValues.length, courseYears, isLateralEntry]);

  return (
    <Box sx={{ mt: 2 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ mb: 2 }}
      >
        <Button
          onClick={handleFetchProfile}
          variant="outlined"
          sx={{
            color: "#423726",
            borderColor: "#C4B5A0",
            whiteSpace: "nowrap",
            "&:hover": { borderColor: "#754B0F", backgroundColor: "rgba(117, 75, 15, 0.04)" },
          }}
        >
          Use Your Profile Data
        </Button>
        <DialogBox inline />
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={3}>
        {yearLabels.map((yearNum, yearIndex) => {
          const sem1Index = yearIndex * 4;
          const sem2Index = yearIndex * 4 + 2;

          return (
            <Grid item xs={12} md={6} key={yearNum}>
              <Box className="semester-input-block">
                <Typography
                  fontWeight="bold"
                  pb={1}
                  textTransform="uppercase"
                  color={Mauntain_Mist}
                >
                  Year {yearNum}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Semester {yearNum * 2 - 1} (Odd)
                </Typography>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <AppTextField
                      required
                      label="Full credit"
                      type="number"
                      value={creditValues[sem1Index + 1] || ""}
                      onChange={(e) => handleCreditChange(sem1Index + 1, e.target.value)}
                      onFocus={() => isVisitedHandler(sem1Index + 1)}
                      error={creditValues[sem1Index + 1] === "" && isVisited[sem1Index + 1]}
                      helperText={
                        creditValues[sem1Index + 1] === "" && isVisited[sem1Index + 1]
                          ? "Required"
                          : "Full credit"
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <AppTextField
                      required
                      label="Obtained credit"
                      type="number"
                      value={creditValues[sem1Index] || ""}
                      onChange={(e) => handleCreditChange(sem1Index, e.target.value)}
                      onFocus={() => isVisitedHandler(sem1Index)}
                      error={creditValues[sem1Index] === "" && isVisited[sem1Index]}
                      helperText={
                        creditValues[sem1Index] === "" && isVisited[sem1Index]
                          ? "Required"
                          : "Obtained credit"
                      }
                    />
                  </Grid>
                </Grid>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Semester {yearNum * 2} (Even)
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <AppTextField
                      required
                      label="Full credit"
                      type="number"
                      value={creditValues[sem2Index + 1] || ""}
                      onChange={(e) => handleCreditChange(sem2Index + 1, e.target.value)}
                      onFocus={() => isVisitedHandler(sem2Index + 1)}
                      error={
                        creditValues[sem2Index + 1] === "" && isVisited[sem2Index + 1]
                      }
                      helperText={
                        creditValues[sem2Index + 1] === "" && isVisited[sem2Index + 1]
                          ? "Required"
                          : "Full credit"
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <AppTextField
                      required
                      label="Obtained credit"
                      type="number"
                      value={creditValues[sem2Index] || ""}
                      onChange={(e) => handleCreditChange(sem2Index, e.target.value)}
                      onFocus={() => isVisitedHandler(sem2Index)}
                      error={creditValues[sem2Index] === "" && isVisited[sem2Index]}
                      helperText={
                        creditValues[sem2Index] === "" && isVisited[sem2Index]
                          ? "Required"
                          : "Obtained credit"
                      }
                    />
                  </Grid>
                </Grid>

                {previewYgpas[yearIndex] !== undefined && (
                  <Typography sx={{ mt: 1.5, fontWeight: 600, color: "#754B0F" }}>
                    YGPA Year {yearNum}: {previewYgpas[yearIndex]}
                  </Typography>
                )}
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Button variant="outlined" onClick={handlePreviewYgpas}>
          Preview YGPAs
        </Button>
      </Box>

      {ygpas.length > 0 && (
        <Card className="result-card" sx={{ mt: 2, p: 2 }}>
          <Typography fontWeight="bold" color="white" textAlign="center">
            YGPAs computed — continue to calculate DGPA
          </Typography>
        </Card>
      )}
    </Box>
  );
};

export default Step2;
