import { Box, Chip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const ChipField = ({ label, value, variant, size }) => (
  <Box
    component="div"
    sx={{
      mb: 0.5,
      display: 'flex',
      alignItems: 'center',
      justifyItems: 'flex-end',
      gap: '0.5em',
      justifyContent: 'space-between',
    }}
  >
    <Chip label={label} size={size} />
    <Typography
      component="span"
      color="primary"
      variant={variant}
      sx={{ ml: 0.5 }}
    >
      <strong>{value}</strong>
    </Typography>
  </Box>
);

ChipField.defaultProps = {
  variant: 'caption',
  size: 'small',
  label: null,
};

ChipField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any.isRequired,
  variant: PropTypes.string,
  size: PropTypes.string,
};
export default ChipField;
