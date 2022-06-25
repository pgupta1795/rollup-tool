import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import useStyles from '../../../Styles/styles';

const TextField = ({
  credentials,
  handleChange,
  icon,
  fieldName,
  placeholder,
  autoComplete,
}) => {
  const classes = useStyles();

  return (
    <FormControl
      margin="dense"
      variant="standard"
      className={classes.resize}
      required
    >
      <InputLabel
        color="primary"
        classes={{ root: classes.formFontSize }}
        htmlFor={fieldName}
      >
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
          focused: classes.formFontSize,
        }}
        className={classes.formFontSize}
        placeholder={placeholder}
        endAdornment={
          <InputAdornment position="end">
            <IconButton className={classes.displayNone}>{icon}</IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

TextField.propTypes = {
  credentials: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
  fieldName: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  autoComplete: PropTypes.string.isRequired,
};
export default TextField;
