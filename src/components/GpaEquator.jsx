'use client';
import React, { useState } from "react";
import { Button, Grid, Typography, Checkbox, MenuItem } from "@mui/material";
import { Box } from "@mui/material";
import { Mauntain_Mist, Cafe_Royale } from "../Colors";
import { AppTextField, AppSelect } from "./common";

const GpaEquator = () => {
  const maxYears = 5;
  const arrayOfMaxYears = new Array(maxYears)
    .fill()
    .map((_, index) => index + 1);
  const [numOfYear, setNumOfYear] = useState(4);
  const maxArrayOfPassoutYears = new Array(numOfYear - 1)
    .fill()
    .map((_, index) => index + 1);
  const [arrayOfYear, setArrayOfYear] = useState(
    new Array(numOfYear).fill().map((_, index) => index + 1)
  );
  const [isLateralEntry, setIsLateralEntry] = useState(false);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [numOfPassoutYear, setNumOfPassoutYear] = useState(3);
  const [arrayOfPassOutYears, setArrayOfPassOutYears] = useState(
    new Array(numOfYear - 1).fill().map((_, index) => index + 1)
  );

  const [yearValues, setYearValues] = useState(new Array(numOfYear).fill(""));
  const [validValues, setValidValues] = useState(
    new Array(numOfPassoutYear).fill(true)
  );
  const [isVisited, setIsVisited] = useState(
    new Array(numOfPassoutYear).fill(false)
  );
  const [checkedBeforeSubmit, setCheckedBeforeSubmit] = useState(
    new Array(numOfYear).fill(true)
  );
  const [targetDGPA, setTargetDGPA] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange1 = (event) => {
    const curr = event.target.value;
    setNumOfYear(curr);
    setArrayOfYear(new Array(curr).fill().map((_, index) => index + 1));
    setNumOfPassoutYear(curr - 1);
    setArrayOfPassOutYears(
      new Array(curr - 1).fill().map((_, index) => index + 1)
    );
    const temp = [...yearValues];
    let count =
      curr > yearValues.length
        ? curr - yearValues.length
        : yearValues.length - curr;
    while (count) {
      if (curr > yearValues.length) {
        temp.push("");
      } else {
        temp.pop();
      }
      count = count - 1;
    }
    setYearValues(temp);
    setValidValues(new Array(curr - 1).fill(true));
  };

  const handleChange2 = (event) => {
    const curr = event.target.value;
    setNumOfPassoutYear(curr);
    setArrayOfPassOutYears(new Array(curr).fill().map((_, index) => index + 1));
  };

  const passoutHandler = (index) => {
    if (index + 1 <= numOfPassoutYear) return true;
    else return false;
  };

  const isVisitedHandler = (index) => {
    const temp = [...isVisited];
    temp[index] = true;
    setIsVisited(temp);
  };

  const handleValueChange = (index, value) => {
    const newTextValues = [...yearValues];
    newTextValues[index] = value;
    setYearValues(newTextValues);
    const temp = [...validValues];
    if (
      (parseFloat(value) > 10 || parseFloat(value) < 0) &&
      passoutHandler(index)
    ) {
      temp[index] = false;
    } else {
      temp[index] = true;
    }
    setValidValues(temp);
  };

  const SgpaOrYgpaValueValidityHandler = (value) => {
    if (value === "") return true;
    if (parseFloat(value) > 10 || parseFloat(value) < 0) return false;
    else return true;
  };

  const focusHandler = (index) => {
    if (index + 1 > numOfPassoutYear) {
      return true;
    }
  };

  const handleSubmit = () => {
    if (!targetDGPA) {
      alert("Please enter a target DGPA.");
      return;
    }
    if (
      yearValues.some((value, index) => {
        if (passoutHandler(index)) {
          return value === "";
        }
        return false;
      })
    ) {
      alert("Please fill all past YGPAs before submitting.");
      const temp = [...checkedBeforeSubmit];
      yearValues.forEach((value, index) => {
        if (passoutHandler(index) && value === "") {
          temp[index] = false;
        }
      });
      setCheckedBeforeSubmit(temp);
    } else if (
      yearValues.some((value, index) => {
        if (passoutHandler(index)) {
          return parseFloat(value) > 10 || parseFloat(value) < 0;
        }
        return false;
      })
    ) {
      alert(
        "Some values are invalid. YGPAs should not be greater than 10 or less than 0."
      );
      const temp = [...validValues];
      yearValues.forEach((value, index) => {
        if (
          (parseFloat(value) > 10 || parseFloat(value) < 0) &&
          passoutHandler(index)
        ) {
          temp[index] = false;
        } else {
          temp[index] = true;
        }
      });
      setValidValues(temp);
    } else {
      let sum = 0;
      const temp = [...yearValues];
      let ans = 0;
      if (
        numOfYear === 5 ||
        numOfYear === 2 ||
        (numOfYear === 3 && isLateralEntry === false)
      ) {
        for (let i = 0; i < numOfPassoutYear; i++) {
          sum += parseFloat(temp[i]);
        }
        const tempMul = numOfYear * parseFloat(targetDGPA);
        ans = (tempMul - sum) / (numOfYear - numOfPassoutYear);
        for (let i = numOfPassoutYear; i < numOfYear; i++) {
          temp[i] = String(ans.toFixed(2));
        }
      } else if (numOfYear === 4) {
        const tempMul = (numOfYear + 1) * parseFloat(targetDGPA);
        for (let i = 0; i < numOfPassoutYear; i++) {
          if (i > 1) {
            sum += 1.5 * parseFloat(temp[i]);
          } else {
            sum += parseFloat(temp[i]);
          }
        }
        if (numOfYear - numOfPassoutYear === 1) {
          ans = (tempMul - sum) / 1.5;
        } else if (numOfYear - numOfPassoutYear === 2) {
          ans = (tempMul - sum) / 3;
        } else {
          ans = (tempMul - sum) / 4;
        }
        for (let i = numOfPassoutYear; i < numOfYear; i++) {
          temp[i] = String(ans.toFixed(2));
        }
        if (ans > 10) {
          alert(
            "Target DGPA is mathematically unreachable. Required YGPA exceeds 10."
          );
        }
      } else {
        const tempMul = (numOfYear + 1) * parseFloat(targetDGPA);
        for (let i = 0; i < numOfPassoutYear; i++) {
          if (i > 0) {
            sum += 1.5 * parseFloat(temp[i]);
          } else {
            sum += parseFloat(temp[i]);
          }
        }
        if (numOfYear - numOfPassoutYear === 1) {
          ans = (tempMul - sum) / 1.5;
        } else {
          ans = (tempMul - sum) / 3;
        }
        for (let i = numOfPassoutYear; i < numOfYear; i++) {
          temp[i] = String(ans.toFixed(2));
        }
        if (ans > 10) {
          alert(
            "Target DGPA is mathematically unreachable. Required YGPA exceeds 10."
          );
        }
      }
      setFormSubmitted(true);
      setYearValues(temp);
    }
  };

  return (
    <Box
      overflow={'auto'}
      style={{
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
          GPA Goal Analyzer
        </Typography>
        <Box>
          <Grid
            container
            spacing={2}
            justifyContent={"center"}
            sx={{ px: 2 }}>
            <Grid
              item
              xs={12}
              md={5}>
              <Box
                borderRadius={3}
                sx={{
                  padding: "1.5rem",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: 'blur(10px)',
                  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
                }}>
                <Typography
                  textAlign={"center"}
                  fontWeight={"bold"}
                  color={Mauntain_Mist}
                  fontSize={14}
                  paddingBottom={2}>
                  SELECT TOTAL YEARS OF YOUR DEGREE
                </Typography>
                <AppSelect
                  label="Degree Years"
                  labelId="select-no-of-years"
                  value={numOfYear}
                  onChange={handleChange1}
                >
                    {arrayOfMaxYears.map((v) => {
                      if (v > 1) {
                        return <MenuItem key={v} value={v}>{v} Years</MenuItem>;
                      }
                      return null;
                    })}
                </AppSelect>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={5}>
              <Box
                borderRadius={3}
                sx={{
                  padding: "1.5rem",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: 'blur(10px)',
                  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
                }}>
                <Typography
                  textAlign={"center"}
                  fontWeight={"bold"}
                  color={Mauntain_Mist}
                  fontSize={14}
                  paddingBottom={2}>
                  SELECT NUMBER OF COMPLETED YEARS
                </Typography>
                <AppSelect
                  label="Completed Years"
                  labelId="select-passout-years"
                  value={numOfPassoutYear}
                  onChange={handleChange2}
                >
                    {maxArrayOfPassoutYears.map((v) => (
                      <MenuItem key={v} value={v}>{v} Year(s)</MenuItem>
                    ))}
                </AppSelect>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
            px: 2
          }}>
          <Box
            borderRadius={3}
            sx={{
              padding: "1.5rem",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: 'blur(10px)',
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
              maxWidth: '900px',
              width: '100%',
              mb: 4
            }}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              mb={2}>
              <Grid item xs={12} sm={4} md={3}>
                <Typography color={Mauntain_Mist} fontWeight="500">
                  Target DGPA:
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                md={4}>
                <AppTextField
                  label="Target DGPA"
                  type="number"
                  placeholder="e.g. 8.5"
                  onChange={(e) => {
                    setTargetDGPA(e.target.value);
                  }}
                  error={!SgpaOrYgpaValueValidityHandler(targetDGPA)}
                  helperText={
                    SgpaOrYgpaValueValidityHandler(targetDGPA)
                      ? ""
                      : "Value must be between 0 and 10"
                  }
                />
              </Grid>
              {numOfYear === 3 ? (
                <>
                  <Grid
                    item
                    xs={6}
                    sm={2}>
                    <Typography color={Mauntain_Mist} fontWeight="500">
                      Lateral Entry:
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    sm={2}>
                    <Checkbox
                      {...label}
                      onChange={(e) => {
                        setIsLateralEntry(e.target.checked);
                      }}
                    />
                  </Grid>
                </>
              ) : null}
            </Grid>
            <Box
              sx={{
                pt: 2,
                mb: 2
              }}>
              <Typography color={Mauntain_Mist} fontWeight="bold" pb={1}>
                Enter Past YGPAs & View Required Target YGPAs:
              </Typography>
            </Box>
            <Grid
              container
              spacing={2}>
              {arrayOfYear.map((item, index) => (
                <Grid item key={item} xs={6} sm={4} md={3}>
                  <AppTextField
                    label={`Year ${item}`}
                    value={yearValues[index] || ""}
                    required={passoutHandler(index)}
                    placeholder={
                      passoutHandler(index) ? "Enter YGPA" : "Required YGPA"
                    }
                    InputProps={
                      passoutHandler(index)
                        ? { readOnly: false }
                        : { readOnly: true }
                    }
                    focused={focusHandler(index)}
                    onFocus={() => isVisitedHandler(index)}
                    error={
                      (isVisited[index] === true &&
                        yearValues[index] === "" &&
                        passoutHandler(index)) ||
                      (passoutHandler(index) && !validValues[index])
                    }
                    helperText={
                      passoutHandler(index)
                        ? validValues[index]
                          ? ""
                          : "Invalid value"
                        : "Target Result"
                    }
                    type="number"
                    onChange={(e) =>
                      handleValueChange(index, e.target.value)
                    }
                  />
                </Grid>
              ))}
            </Grid>
            <Box mt={3}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleSubmit}>
                Analyze Goal
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GpaEquator;
