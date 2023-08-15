import { Box, Paper } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const CustomPaper = ({ children }) => (
  <Box
    component="div"
    sx={{
      flexGrow: 1,
      width: '100%',
      mb: 1,
    }}
  >
    <Paper
      component="div"
      sx={{
        width: '100%',
      }}
    >
      {children}
    </Paper>
  </Box>
);

CustomPaper.propTypes = {
  children: PropTypes.element.isRequired,
};
export default CustomPaper;
