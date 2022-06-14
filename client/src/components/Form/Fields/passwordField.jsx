import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import React from "react";
import useStyles from "../../../Styles/styles.js";

const PasswordField = ({ credentials, setCredentials, handleChange }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl
      margin="dense"
      variant="standard"
      className={classes.resize}
      required={true}
    >
      <InputLabel
        margin="dense"
        color="primary"
        htmlFor="standard-adornment-password"
        className={classes.formFontSize}
      >
        Password
      </InputLabel>
      <Input
        id="standard-adornment-password"
        autoComplete="current-password"
        type={showPassword ? "text" : "password"}
        value={credentials.password}
        onChange={handleChange("password")}
        inputProps={{
          focused: classes.formFontSize,
        }}
        className={classes.formFontSize}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              className={classes.displayNone}
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={(event) => event.preventDefault()}
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

export default PasswordField;
