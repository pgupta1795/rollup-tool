import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const ColumnFlexBox = ({ children }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
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

ColumnFlexBox.propTypes = {
  children: PropTypes.any.isRequired,
};
export default ColumnFlexBox;
