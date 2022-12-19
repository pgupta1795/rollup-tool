import { Typography } from '@mui/material';
import React from 'react';

const Welcome = () => (
  <Typography
    variant="h4"
    sx={{ textDecoration: 'underline' }}
    display="inline"
  >
    WELCOME,
    <br />
    <strong>{`${localStorage.getItem('firstname')} ${localStorage.getItem(
      'lastname'
    )}`}</strong>
  </Typography>
);

export default Welcome;
