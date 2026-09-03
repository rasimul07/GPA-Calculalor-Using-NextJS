'use client';
import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

const AppSelect = ({
  label,
  labelId,
  value,
  onChange,
  children,
  fullWidth = true,
  size = 'small',
  id,
  disabled = false,
  sx,
}) => {
  const resolvedLabelId = labelId || `${id || label}-label`;

  return (
    <FormControl fullWidth={fullWidth} size={size} sx={sx}>
      <InputLabel id={resolvedLabelId}>{label}</InputLabel>
      <Select
        labelId={resolvedLabelId}
        id={id}
        value={value}
        label={label}
        onChange={onChange}
        disabled={disabled}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default AppSelect;
