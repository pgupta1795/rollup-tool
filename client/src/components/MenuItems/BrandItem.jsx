import { Typography } from '@mui/material';
import React from 'react';

const BrandItem = ({ ...rest }) => (
  <Typography
    align="center"
    {...rest}
    sx={{
      typography: 'h5',
      padding: '2px 1em',
      wordWrap: 'break-word',
    }}
    component="span"
  >
    <strong>{document.title?.toUpperCase()}</strong>
  </Typography>
);

export default BrandItem;
