'use client';
import React, { useState } from "react";
import { Button, Grid, Typography, Stack, Card } from "@mui/material";
import { Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Mauntain_Mist, Corn, Cafe_Royale } from "../Colors";
import myImage from '../images/credit-details.png';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from '@mui/material/DialogContent';
import "../responsiveImage.css";
import { AppTextField, AppSelect } from "./common";
import { sgpaToPercentage, calculateOverallPercentageFromCredits } from "../utils/profileGpaUtils";

const FindPercentage = () => {
  const [formType, setFormType] = useState(1);

  return (
    <Box
      overflow={'auto'}
      style={{
        backgroundImage:
          "URL(https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80)",
        backgroundSize: "cover",
        minHeight: '100vh',
        backgroundPosition: "center center",
      }}>
      <Box>
        <Typography
          textAlign={"center"}
          variant="h4"
          className="calc-page-title"
          color={"white"}
          fontWeight={"bold"}
          padding={2}
          sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)', fontSize: { xs: '1.35rem', sm: '1.75rem', md: '2rem' } }}>
          Find Percentage
        </Typography>
        <Grid container spacing={3} justifyContent="center" className="page-shell" sx={{ px: { xs: 1, sm: 2 } }}>
          <Grid
            item
            xs={12}
            md={5}
          >
            <Box>
              <Box className="form-card" sx={{ margin: 1 }}>
                <Stack spacing={1.5}>
                  <Typography textAlign={"center"} fontWeight={"bold"} color={Mauntain_Mist}>
                    PLEASE SELECT A METHOD FROM BELOW
                  </Typography>
                  <Button
                    size="large"
                    variant={formType === 1 ? "contained" : "outlined"}
                    style={formType === 1 ? { background: Cafe_Royale } : {}}
                    className="custom-button"
                    onClick={() => {
                      setFormType(1);
                    }}>
                    Using SGPA
                  </Button>
                  <Button
                    size="large"
                    style={formType === 2 ? { background: Cafe_Royale } : {}}
                    variant={formType === 2 ? "contained" : "outlined"}
                    onClick={() => {
                      setFormType(2);
                    }}>
                    Using Credit Score
                  </Button>
                  <Button
                    size="large"
                    variant={formType === 3 ? "contained" : "outlined"}
                    style={formType === 3 ? { background: Cafe_Royale } : {}}
                    onClick={() => {
                      setFormType(3);
                    }}>
                    Using YGPA
                  </Button>
                </Stack>
              </Box>
              <DialogBox></DialogBox>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box className="form-card" sx={{ padding: "2rem", margin: "0.5rem" }}>
              <CustomForm formType={formType}></CustomForm>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const CustomForm = ({ formType }) => {
  if (formType === 1) {
    return <SgpaToPercentage></SgpaToPercentage>;
  } else if (formType === 2) {
    return <CreditPointToPercentage></CreditPointToPercentage>;
  }
  return <YgpaToPercentage></YgpaToPercentage>;
};

const CreditPointToPercentage = () => {
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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [percentage, setPercentage] = useState(null);

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
      alert("Please fill in all fields before submitting.");
      const temp = [...checkedBeforeSubmit];
      creditValues.forEach((value, index) => {
        if (value === "") {
          temp[index] = false;
        }
      });
      setCheckedBeforeSubmit(temp);
    } else {
      const per = calculateOverallPercentageFromCredits(creditValues);
      setPercentage(per);
      setFormSubmitted(true);
    }
  };

  return (
    <Box>
      <CustomFormControl numOfSemester={numOfSemester} handleChange={handleChange}></CustomFormControl>
      <Box>
        <Grid container spacing={2} id='sgpa_to_percentage_form'>
          {arrayOfSems.map((item, index) => (
            <Grid
              key={item}
              item
              xs={12}
            >
              <Typography
                fontWeight={"bold"}
                padding={1}
                textTransform={"uppercase"}
                color={Mauntain_Mist}>
                For semester {item}:
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
                    value={creditValues[index * 2 + 1] || ""}
                    error={
                      (creditValues[index * 2 + 1] === "" && isVisited[index * 2 + 1])
                    }
                    helperText={
                      (creditValues[index * 2 + 1] === "" && isVisited[index * 2 + 1])
                        ? "Required field"
                        : "Enter Full credit points"
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
                    value={creditValues[index * 2] || ""}
                    error={
                      (creditValues[index * 2] === "" && isVisited[index * 2])
                    }
                    helperText={
                      (creditValues[index * 2] === "" && isVisited[index * 2])
                        ? "Required field"
                        : "Enter obtained credit points"
                    }
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
      <FindPercentageButton handleSubmit={handleSubmit}></FindPercentageButton>
      <ShowPercentage
        formSubmitted={formSubmitted}
        percentage={percentage}></ShowPercentage>
    </Box>
  );
};

const SgpaToPercentage = () => {
  const [numOfSemester, setNumOfSemester] = useState(2);
  const [arrayOfSems, setArrayOfSems] = useState(
    new Array(numOfSemester).fill().map((_, index) => index + 1)
  );
  const [semValues, setSemValues] = useState(new Array(numOfSemester).fill(""));
  const [isVisited, setIsVisited] = useState(
    new Array(numOfSemester).fill(false)
  );
  const [checkedBeforeSubmit, setCheckedBeforeSubmit] = useState(
    new Array(numOfSemester).fill(true)
  );
  const [percentage, setPercentage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (event) => {
    const curr = event.target.value;
    setNumOfSemester(curr);
    setArrayOfSems(new Array(curr).fill().map((_, index) => index + 1));
    const temp = [...semValues];
    let count =
      curr > semValues.length
        ? curr - semValues.length
        : semValues.length - curr;
    while (count) {
      if (curr > semValues.length) {
        temp.push("");
      } else {
        temp.pop();
      }
      count = count - 1;
    }
    setSemValues(temp);
    setCheckedBeforeSubmit(new Array(curr).fill(true));
  };

  const isVisitedHandler = (index) => {
    const temp = [...isVisited];
    temp[index] = true;
    setIsVisited(temp);
  };

  const handleValueChange = (index, value) => {
    const newTextValues = [...semValues];
    newTextValues[index] = value;
    setSemValues(newTextValues);
  };

  const handleSubmit = () => {
    if (semValues.some((value) => value === "")) {
      alert("Please fill in all fields before submitting.");
      const temp = [...checkedBeforeSubmit];
      semValues.forEach((value, index) => {
        if (value === "") {
          temp[index] = false;
        }
      });
      setCheckedBeforeSubmit(temp);
    } else {
      const sum = semValues.reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue);
      }, 0);
      const per = (sum / (numOfSemester * 10)) * 100 - 0.75;
      setPercentage(per.toFixed(2));
      setFormSubmitted(true);
    }
  };

  return (
    <Box>
      <CustomFormControl numOfSemester={numOfSemester} handleChange={handleChange}></CustomFormControl>
      <Box>
        <Grid container spacing={2}>
          {arrayOfSems.map((item, index) => (
            <Grid key={item} item xs={6} md={6}>
              <AppTextField
                required
                label={`Sem ${item}`}
                value={semValues[index] || ""}
                error={
                  (semValues[index] === "" && isVisited[index])
                }
                onFocus={() => isVisitedHandler(index)}
                helperText={
                  (semValues[index] === "" && isVisited[index])
                    ? "Required field"
                    : "Enter SGPA"
                }
                placeholder="Enter SGPA"
                type="number"
                onChange={(e) =>
                  handleValueChange(index, e.target.value)
                } />
            </Grid>
          ))}
        </Grid>
      </Box>
      <FindPercentageButton handleSubmit={handleSubmit}></FindPercentageButton>
      <ShowPercentage
        formSubmitted={formSubmitted}
        percentage={percentage}></ShowPercentage>
    </Box>
  );
};

const YgpaToPercentage = () => {
  const [numOfYear, setNumOfYear] = useState(1);
  const [arrayOfYears, setArrayOfYears] = useState([1]);
  const [yearValues, setYearValues] = useState([""]);
  const [isVisited, setIsVisited] = useState([false]);
  const [checkedBeforeSubmit, setCheckedBeforeSubmit] = useState([true]);
  const [percentage, setPercentage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (event) => {
    const curr = event.target.value;
    setNumOfYear(curr);
    setArrayOfYears(new Array(curr).fill().map((_, index) => index + 1));
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
    setIsVisited(new Array(curr).fill(false));
    setCheckedBeforeSubmit(new Array(curr).fill(true));
    setFormSubmitted(false);
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
  };

  const handleSubmit = () => {
    if (yearValues.some((value) => value === "")) {
      alert("Please fill in all fields before submitting.");
      const temp = [...checkedBeforeSubmit];
      yearValues.forEach((value, index) => {
        if (value === "") {
          temp[index] = false;
        }
      });
      setCheckedBeforeSubmit(temp);
    } else if (
      yearValues.some((value) => parseFloat(value) > 10 || parseFloat(value) < 0)
    ) {
      alert(
        "Some values are invalid. YGPAs should not be greater than 10 or less than 0."
      );
    } else {
      const sum = yearValues.reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue);
      }, 0);
      const avgYgpa = sum / numOfYear;
      setPercentage(sgpaToPercentage(avgYgpa));
      setFormSubmitted(true);
    }
  };

  return (
    <Box>
      <CustomFormControl
        numOfSemester={numOfYear}
        handleChange={handleChange}
        label="No of years"
        options={[1, 2, 3, 4, 5]}
        labelId="select-no-of-years-label"
      />
      <Box>
        <Grid container spacing={2}>
          {arrayOfYears.map((item, index) => (
            <Grid key={item} item xs={6} md={6}>
              <AppTextField
                required
                label={`Year ${item}`}
                value={yearValues[index] || ""}
                error={
                  yearValues[index] === "" && isVisited[index]
                }
                onFocus={() => isVisitedHandler(index)}
                helperText={
                  yearValues[index] === "" && isVisited[index]
                    ? "Required field"
                    : "Enter YGPA"
                }
                placeholder="Enter YGPA"
                type="number"
                onChange={(e) =>
                  handleValueChange(index, e.target.value)
                } />
            </Grid>
          ))}
        </Grid>
      </Box>
      <FindPercentageButton handleSubmit={handleSubmit}></FindPercentageButton>
      <ShowPercentage
        formSubmitted={formSubmitted}
        percentage={percentage}></ShowPercentage>
    </Box>
  );
};

const CustomFormControl = ({
  numOfSemester,
  handleChange,
  label = "No of sems",
  options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  labelId = "select-no-of-sems-label",
}) => {
  return (
    <AppSelect
      label={label}
      labelId={labelId}
      value={numOfSemester}
      onChange={handleChange}
      sx={{ mb: 3 }}
    >
      {options.map((n) => (
        <MenuItem key={n} value={n}>{n}</MenuItem>
      ))}
    </AppSelect>
  );
};

const FindPercentageButton = ({ handleSubmit }) => {
  return (
    <Button variant="contained" size="large" sx={{ mt: 3 }} onClick={handleSubmit}>
      Calculate Percentage
    </Button>
  );
};

const ShowPercentage = ({ formSubmitted, percentage }) => {
  return (
    <Box>
      {(formSubmitted) ? <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Card className="result-card" sx={{ minWidth: 200 }}>
          <Typography fontWeight={'bold'} color={'white'}>
            Your Percentage is: {percentage}%
          </Typography>
        </Card> </Box> : null}
    </Box>
  );
};

const DialogBox = ({ inline = false }) => {
  const [open, setOpen] = useState(false);

  const triggerButton = (
    <Button
      onClick={() => setOpen(true)}
      variant="outlined"
      sx={{
        color: '#423726',
        borderColor: '#C4B5A0',
        whiteSpace: { xs: 'normal', sm: 'nowrap' },
        fontSize: { xs: '0.8rem', sm: '0.875rem' },
        '&:hover': {
          borderColor: '#754B0F',
          backgroundColor: 'rgba(117, 75, 15, 0.04)',
        },
      }}
    >
      Where do I find Credit points?
    </Button>
  );

  return (
    <>
      {inline ? (
        triggerButton
      ) : (
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {triggerButton}
          </Box>
        </Box>
      )}
      <Dialog
        onClose={() => { setOpen(false) }}
        open={open}
        fullWidth
        maxWidth="md"
        scroll="body"
        PaperProps={{
          sx: {
            m: { xs: 1, sm: 2 },
            width: '100%',
            maxHeight: { xs: '90dvh', sm: 'none' },
          },
        }}
      >
        <DialogTitle sx={{ fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.2rem' }, pr: 6 }}>
          Result of a semester that helps you find full and obtained credit
        </DialogTitle>
        <DialogContent>
          <img src={myImage.src || myImage} alt="Credit breakdown example" className="responsive_image" style={{ width: '100%', height: 'auto' }}></img>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpen(false) }} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { FindPercentage, CustomFormControl, DialogBox };
