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

const YearBreakdownTable = ({ years }) => {
  if (!years || years.length === 0) return null;

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} color={Birch} sx={{ mb: 1.5 }}>
        Year Breakdown
      </Typography>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: '1px solid #E0D8CC', borderRadius: 2, overflowX: 'auto' }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#F5F1EB' }}>
              <TableCell sx={{ fontWeight: 700 }}>Year</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, color: Cafe_Royale }}>YGPA</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>Percentage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {years.map((row) => (
              <TableRow key={row.year} hover>
                <TableCell>Year {row.year}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, color: Cafe_Royale }}>
                  {row.ygpa}
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

export default YearBreakdownTable;
