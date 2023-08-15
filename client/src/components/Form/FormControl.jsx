import React from 'react';
import { FormControl as MuiFormControl } from '@mui/material';
import PropTypes from 'prop-types';

const FormControl = ({ children }) => (
  <MuiFormControl
    margin="dense"
    variant="standard"
    required
    fullWidth
    sx={{
      width: {
        xs: '90vw',
        sm: '70vw',
        md: '40vw',
        lg: '30vw',
        xl: '25vw',
      },
      lineHeight: '1.5em',
      margin: '5px',
      paddingBottom: '5px',
      paddingTop: '5px',
      textAlign: 'justify',
    }}
  >
    {children}
  </MuiFormControl>
);

FormControl.propTypes = {
  children: PropTypes.any.isRequired,
};
export default FormControl;
