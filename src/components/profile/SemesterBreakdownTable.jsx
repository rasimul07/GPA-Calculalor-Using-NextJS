'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { Cafe_Royale, Birch } from '../../Colors';

const SemesterBreakdownTable = ({ semesters }) => {
  if (!semesters || semesters.length === 0) return null;

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} color={Birch} sx={{ mb: 1.5 }}>
        Semester Breakdown
      </Typography>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: '1px solid #E0D8CC', borderRadius: 2, overflowX: 'auto' }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#F5F1EB' }}>
              <TableCell sx={{ fontWeight: 700 }}>Semester</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Year</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>Obtained</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>Full</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, color: Cafe_Royale }}>SGPA</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>Percentage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {semesters.map((row) => (
              <TableRow key={row.semester} hover>
                <TableCell>{row.semester}</TableCell>
                <TableCell>{row.year}</TableCell>
                <TableCell align="center">{row.obtained}</TableCell>
                <TableCell align="center">{row.full}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, color: Cafe_Royale }}>
                  {row.sgpa}
                </TableCell>
                <TableCell align="center">{row.percentage}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SemesterBreakdownTable;
