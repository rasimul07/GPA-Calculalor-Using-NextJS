'use client';
import React, { useState } from "react";
import { Button, Grid, Typography, Stack, TextField, Card } from "@mui/material";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Mauntain_Mist, Birch, Corn, Cafe_Royale } from "../Colors";
import myImage from '../images/credit-details.png';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from '@mui/material/DialogContent';
import "../responsiveImage.css";

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
          color={"white"}
          fontWeight={"bold"}
          padding={2}
          sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
          Find Percentage
        </Typography>
        <Grid container spacing={3} justifyContent="center" sx={{ px: 2 }}>
          <Grid
            item
            xs={12}
            md={5}
          >
            <Box>
              <Box
                borderRadius={3}
                sx={{ background: "rgba(255, 255, 255, 0.95)", p: 3, boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)", margin: 1 }}>
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
            <Box
              borderRadius={3}
              sx={{ padding: "2rem", margin: "0.5rem", background: "rgba(255, 255, 255, 0.95)", boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)" }}>
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
  } else {
    return <Typography sx={{ p: 2 }}>Service is coming soon</Typography>;
  }
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
      let obcredit = 0;
      let total_full_credit = 0;
      creditValues.forEach((value, index) => {
        if (index % 2 === 0) {
          obcredit = obcredit + parseFloat(value);
        } else {
          total_full_credit = total_full_credit + parseFloat(value);
        }
      });
      const per = (obcredit / (total_full_credit * 10)) * 100;
      setPercentage(per.toFixed(2));
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
                  <TextField
                    variant="outlined"
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
                        : "Enter obtained credit points"
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
              <TextField
                variant="outlined"
                fullWidth
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
                }></TextField>
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

const CustomFormControl = ({ numOfSemester, handleChange }) => {
  return (
    <FormControl fullWidth sx={{ mb: 3 }} size="small">
      <InputLabel id="select-no-of-sems-label">No of sems</InputLabel>
      <Select
        labelId="select-no-of-sems-label"
        value={numOfSemester}
        label="No of sems"
        onChange={handleChange}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
          <MenuItem key={n} value={n}>{n}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const FindPercentageButton = ({ handleSubmit }) => {
  return (
    <Button variant="contained" sx={{ mt: 3 }} style={{ backgroundColor: Cafe_Royale }} onClick={handleSubmit}>
      Calculate Percentage
    </Button>
  );
};

const ShowPercentage = ({ formSubmitted, percentage }) => {
  return (
    <Box>
      {(formSubmitted) ? <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Card sx={{ p: 2, backgroundColor: Corn, minWidth: 200, textAlign: 'center' }}>
          <Typography fontWeight={'bold'} color={'white'}>
            Your Percentage is: {percentage}%
          </Typography>
        </Card> </Box> : null}
    </Box>
  );
};

const DialogBox = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box mt={2}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => { setOpen(true) }} variant="outlined" sx={{ color: 'black', borderColor: 'white' }}>Where do I find Credit points?</Button>
      </Box>
      <Dialog onClose={() => { setOpen(false) }} open={open} maxWidth={'md'}>
        <DialogTitle sx={{ fontSize: { xs: '1rem', md: '1.2rem' } }}>Result of a semester that helps you find full and obtained credit</DialogTitle>
        <DialogContent>
          <img src={myImage.src || myImage} alt="Credit breakdown example" className="responsive_image" style={{ width: '100%', height: 'auto' }}></img>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpen(false) }} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export { FindPercentage, CustomFormControl, DialogBox };
