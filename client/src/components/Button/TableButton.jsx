import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const TableButton = ({ children, ...props }) => (
  <Button variant="contained" disableElevation {...props} size="small">
    {children}
  </Button>
);

TableButton.propTypes = {
  children: PropTypes.any.isRequired,
};
export default TableButton;
