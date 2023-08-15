import { IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import FormControl from '../FormControl';

const TextField = ({
  credentials,
  handleChange,
  icon,
  fieldName,
  placeholder,
  autoComplete,
}) => (
  <FormControl>
    <InputLabel color="primary" htmlFor={fieldName}>
      {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
    </InputLabel>
    <Input
      id={fieldName}
      type="text"
      value={credentials[fieldName]}
      autoComplete={autoComplete}
      onChange={handleChange(fieldName)}
      inputProps={{
        spellCheck: 'false',
      }}
      placeholder={placeholder}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            className="login-field-icon"
            style={{ '--delay': '500ms' }}
          >
            {icon}
          </IconButton>
        </InputAdornment>
      }
    />
  </FormControl>
);

TextField.propTypes = {
  credentials: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
  fieldName: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  autoComplete: PropTypes.string.isRequired,
};
export default TextField;
