import { FormControlLabel, Radio } from '@mui/material';
import React from 'react';

const RadioField = (props) => (
  <FormControlLabel control={<Radio />} {...props} />
);

export default RadioField;
