import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import React from "react";
import useStyles from "../../../Styles/styles.js";

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
      required={true}
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
        type={"text"}
        value={credentials[fieldName]}
        autoComplete={autoComplete}
        onChange={handleChange(fieldName)}
        inputProps={{
          spellCheck: "false",
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

export default TextField;
