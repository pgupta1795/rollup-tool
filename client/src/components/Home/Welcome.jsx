import { Typography } from '@mui/material';
import React from 'react';
import { getUserFullName } from '../../services/AuthService';

const Welcome = () => (
  <Typography
    variant="h4"
    sx={{ textDecoration: 'underline' }}
    display="inline"
  >
    WELCOME,
    <br />
    <strong>{getUserFullName()}</strong>
  </Typography>
);

export default Welcome;
