'use client';
import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PercentIcon from '@mui/icons-material/Percent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Cafe_Royale, Birch, Corn } from '../../Colors';

const summaryItems = [
  { key: 'dgpa', label: 'DGPA', icon: SchoolIcon, color: Cafe_Royale },
  { key: 'cgpa', label: 'CGPA', icon: TrendingUpIcon, color: Birch },
  { key: 'overallPercentage', label: 'Overall %', icon: PercentIcon, color: '#2E7D32', suffix: '%' },
  { key: 'semesterCount', label: 'Semesters', icon: CalendarMonthIcon, color: Corn, isCount: true },
];

const ProfileSummaryCards = ({ breakdown }) => {
  if (!breakdown) return null;

  return (
    <Grid container spacing={2}>
      {summaryItems.map(({ key, label, icon: Icon, color, suffix = '', isCount }) => (
        <Grid item xs={6} md={3} key={key}>
          <Card
            elevation={0}
            sx={{
              border: '1px solid #E0D8CC',
              borderRadius: 2,
              height: '100%',
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Icon sx={{ color, fontSize: 22 }} />
                <Typography variant="body2" color="text.secondary" fontWeight={600}>
                  {label}
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight={700} color={Birch}>
                {isCount ? breakdown[key] : `${breakdown[key]}${suffix}`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProfileSummaryCards;
