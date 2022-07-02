import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Radio, Typography } from '@mui/material';

const RadioField = ({ value, label, title }) => (
  <FormControlLabel
    value={value}
    control={<Radio />}
    title={title}
    label={<Typography variant="subtitle2">{label}</Typography>}
  />
);

RadioField.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
export default RadioField;
