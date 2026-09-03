'use client';
import React from 'react';
import TextField from '@mui/material/TextField';

const AppTextField = React.forwardRef(function AppTextField(props, ref) {
  const { size = 'small', variant = 'outlined', fullWidth = true, ...rest } = props;

  return (
    <TextField
      ref={ref}
      size={size}
      variant={variant}
      fullWidth={fullWidth}
      {...rest}
    />
  );
});

export default AppTextField;
