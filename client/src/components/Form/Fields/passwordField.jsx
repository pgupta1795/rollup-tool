import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import FormControl from '../FormControl';

const PasswordField = ({ credentials, handleChange }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl>
      <InputLabel
        margin="dense"
        color="primary"
        htmlFor="standard-adornment-password"
      >
        Password
      </InputLabel>
      <Input
        id="standard-adornment-password"
        autoComplete="current-password"
        type={showPassword ? 'text' : 'password'}
        value={credentials.password}
        onChange={handleChange('password')}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={(event) => event.preventDefault()}
              id="login-field-icon"
              className="icon-2"
            >
              {showPassword ? (
                <VisibilityOff color="primary" />
              ) : (
                <Visibility color="primary" />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

PasswordField.propTypes = {
  credentials: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};
export default PasswordField;
