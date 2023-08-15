import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const FlexBox = ({ children }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      width: 'fit-content',
      '& svg': {
        m: 1.5,
      },
      '& hr': {
        mx: 0.5,
      },
    }}
  >
    {children}
  </Box>
);

FlexBox.propTypes = {
  children: PropTypes.any.isRequired,
};
export default FlexBox;
