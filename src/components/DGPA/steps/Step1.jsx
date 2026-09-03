import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";
import { useDGPA } from "../../../context/dgpaContext.jsx";
import { AppSelect } from "../../common";

const Step1 = () => {
  const { courseYears, setCourseYears, isLateralEntry, setIsLateralEntry } = useDGPA();

  const handleChange = (event) => {
    setCourseYears(Number(event.target.value));
  };

  return (
    <Box sx={{ mt: 2 }}>
      <AppSelect
        label="No Of Years"
        labelId="dgpa-years-select-label"
        value={courseYears}
        onChange={handleChange}
        size="medium"
      >
        <MenuItem value={2}>Two Years</MenuItem>
        <MenuItem value={3}>Three Years</MenuItem>
        <MenuItem value={4}>Four Years</MenuItem>
        <MenuItem value={5}>Five Years</MenuItem>
      </AppSelect>

      {courseYears === 4 && (
        <FormControlLabel
          sx={{ mt: 2, display: "block" }}
          control={
            <Checkbox
              checked={isLateralEntry}
              onChange={(e) => setIsLateralEntry(e.target.checked)}
            />
          }
          label="Lateral Entry (skip Year 1 — enter credits for Years 2, 3, 4 only)"
        />
      )}
    </Box>
  );
};

export default Step1;
