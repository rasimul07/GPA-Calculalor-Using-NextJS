'use client';
import React, { useEffect } from "react";
import { Typography, Card, Divider, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Box } from "@mui/material";
import { useDGPA } from "../../../context/dgpaContext.jsx";
import { getActiveYearLabels, getDgpaFormulaText } from "../../../utils/gpaCalculations";

const Step3 = () => {
  const { courseYears, isLateralEntry, ygpas, dgpa, computeAndStoreDgpa } = useDGPA();
  const yearLabels = getActiveYearLabels(courseYears, isLateralEntry);

  useEffect(() => {
    if (ygpas.length > 0) {
      computeAndStoreDgpa(ygpas);
    }
  }, [ygpas, computeAndStoreDgpa]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Your Yearly GPAs
      </Typography>

      <Table size="small" sx={{ mb: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell><strong>Year</strong></TableCell>
            <TableCell align="right"><strong>YGPA</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {yearLabels.map((yearNum, index) => (
            <TableRow key={yearNum}>
              <TableCell>Year {yearNum}</TableCell>
              <TableCell align="right">{ygpas[index] ?? "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Formula used: {getDgpaFormulaText(courseYears, isLateralEntry)}
      </Typography>

      <Card className="result-card" sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold" color="white" textAlign="center">
          Your DGPA is: {dgpa || "—"}
        </Typography>
      </Card>
    </Box>
  );
};

export default Step3;
