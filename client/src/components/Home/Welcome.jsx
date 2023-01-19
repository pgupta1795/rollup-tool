import { Typography } from '@mui/material';
import React from 'react';
import { getUserFullName } from '../../services/AuthService';

const Welcome = () => (
  <Typography variant="h4" sx={{ lineHeight: 1.5 }}>
    WELCOME,
    <br />
    <strong className="app-title">{getUserFullName()}</strong>
  </Typography>
);

export default Welcome;
