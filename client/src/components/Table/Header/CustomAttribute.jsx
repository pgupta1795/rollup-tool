import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const CustomAttribute = ({ column }) => (
  <Box color="primary.main">{column.columnDef?.header}</Box>
);

CustomAttribute.propTypes = {
  column: PropTypes.object.isRequired,
};

export default CustomAttribute;
