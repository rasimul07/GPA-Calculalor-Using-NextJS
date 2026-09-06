'use client';
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { fetchProfileData } from '../../services/profileData';

export const profileDataButtonSx = {
  color: '#423726',
  borderColor: '#C4B5A0',
  whiteSpace: 'nowrap',
  '&:hover': {
    borderColor: '#754B0F',
    backgroundColor: 'rgba(117, 75, 15, 0.04)',
  },
};

const ProfileDataButton = ({ onLoaded, onError, label = 'Use Your Profile Data', ...buttonProps }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const data = await fetchProfileData();
      onLoaded?.(data);
    } catch (err) {
      const message = err.message || 'Failed to fetch profile data. Please make sure you are signed in.';
      if (onError) {
        onError(message);
      } else {
        alert(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="outlined"
      disabled={loading}
      sx={profileDataButtonSx}
      {...buttonProps}
    >
      {loading ? 'Loading...' : label}
    </Button>
  );
};

export default ProfileDataButton;
