import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const GradientBox = styled((props) => <Box {...props} />)(
  ({ theme, colors }) => ({
    color: 'white',
    ...(colors && {
      background:
        theme.palette.mode === 'dark'
          ? theme.palette.background.default
          : `linear-gradient(to right, ${colors.join(',')})`,
    }),
  })
);

export default GradientBox;
