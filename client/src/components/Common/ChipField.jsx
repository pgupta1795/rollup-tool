import { Box, Chip, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const ChipField = ({ label, value }) => (
  <Box component="div" sx={{ mb: 0.5 }}>
    <Chip label={label} color="primary" size="small" />
    <Typography component="span" color="text.secondary" variant="caption">
      {value}
    </Typography>
  </Box>
);

ChipField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
};
export default ChipField;
