import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const Submit = ({ children, ...props }) => (
  <Button
    disableElevation
    {...props}
    sx={{ mt: 1, mr: 1 }}
    type="submit"
    variant="contained"
    size="small"
  >
    {children}
  </Button>
);

Submit.propTypes = {
  children: PropTypes.any.isRequired,
};
export default Submit;
