'use client';
import React, { useState } from "react";
import { Button, Grid, Typography, Divider, Stack, Card } from "@mui/material";
import { Box } from "@mui/material";
import { Mauntain_Mist } from "../../../Colors";
import { DialogBox } from "../../FindPercentage";
import { AppTextField, ProfileDataButton } from "../../common";
import { useDGPA } from "../../../context/dgpaContext.jsx";
import { getActiveYearLabels } from "../../../utils/gpaCalculations";

const Step2 = ({ onValidationError }) => {
  const {
    courseYears,
    isLateralEntry,
    creditValues,
    setCreditValues,
    ygpas,
    computeAndStoreYgpas,
    loadFromProfile,
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

  const handleProfileLoaded = (data) => {
    loadFromProfile(data);
    onValidationError?.("");
  };

  const handlePreviewYgpas = () => {
    const computed = computeAndStoreYgpas();
    setPreviewYgpas(computed);
  };

  React.useEffect(() => {
    setIsVisited(new Array(creditValues.length).fill(false));
    setPreviewYgpas([]);
  }, [creditValues.length, courseYears, isLateralEntry]);

  const isVisitedHandler = (index) => {
    const temp = [...isVisited];
    temp[index] = true;
    setIsVisited(temp);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ mb: 2 }}
      >
        <ProfileDataButton onLoaded={handleProfileLoaded} onError={onValidationError} />
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
