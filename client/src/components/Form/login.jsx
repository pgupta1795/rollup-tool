import { AccountCircle, Link as Http, Send } from '@mui/icons-material';
import { Box, Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import PasswordField from './Fields/passwordField';
import TextField from './Fields/textField';
import useStyles from '../../Styles/styles';

const Login = ({ userLogin, credentials, setCredentials }) => {
  const classes = useStyles();
  const handleChange = (prop) => (event) => {
    setCredentials({ ...credentials, [prop]: event.target.value });
  };

  return (
    <Box
      className="login-form"
      onSubmit={userLogin}
      autoComplete="on"
      component="form"
    >
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
        className={classes.formContainer}
        spacing={1}
      >
        <Grid item>
          <TextField
            credentials={credentials}
            handleChange={handleChange}
            icon={<AccountCircle color="primary" />}
            fieldName="username"
            placeholder=""
            defaultValue=""
            autoComplete="username"
          />
        </Grid>
        <Grid item>
          <PasswordField
            credentials={credentials}
            handleChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            credentials={credentials}
            handleChange={handleChange}
            icon={<Http color="primary" />}
            fieldName="3dspace"
            placeholder="https://example.com/3dspace"
            autoComplete=""
          />
        </Grid>
        <Grid item>
          <TextField
            credentials={credentials}
            handleChange={handleChange}
            icon={<Http color="primary" />}
            fieldName="3dpassport"
            placeholder="https://example.com/3dpassport"
            autoComplete=""
          />
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            classes={{ root: classes.button }}
            size="large"
            endIcon={<Send />}
          >
            <span className={classes.displayNone}>Connect to 3DX</span>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

Login.propTypes = {
  credentials: PropTypes.object.isRequired,
  setCredentials: PropTypes.func.isRequired,
  userLogin: PropTypes.func.isRequired,
};
export default Login;
