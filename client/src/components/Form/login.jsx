import { AccountCircle, Send } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import ColumnFlexBox from '../Common/ColumnFlexBox';
import PasswordField from './Fields/PasswordField';
import TextField from './Fields/TextField';
import LoginHeader from './LoginHeader';

const Login = ({ userLogin, credentials, setCredentials }) => {
  const handleChange = (prop) => (event) => {
    setCredentials({ ...credentials, [prop]: event.target.value });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} display={{ xs: 'none', sm: 'block' }} />
      <Box
        onSubmit={userLogin}
        autoComplete="on"
        component="form"
        width="100%"
        className="login-form"
      >
        <ColumnFlexBox>
          <LoginHeader id="login-header" />
          <Stack
            direction="column"
            sx={{
              width: '100%',
              padding: '5px',
            }}
            id="login-fields-container"
          >
            <TextField
              credentials={credentials}
              handleChange={handleChange}
              icon={<AccountCircle color="primary" />}
              fieldName="username"
              placeholder=""
              defaultValue=""
              autoComplete="username"
            />
            <PasswordField
              credentials={credentials}
              handleChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              endIcon={<Send />}
              sx={{
                mt: 3,
              }}
            >
              <Typography component="span" variant="button">
                Connect to 3DX
              </Typography>
            </Button>
          </Stack>
        </ColumnFlexBox>
      </Box>
    </>
  );
};

Login.propTypes = {
  credentials: PropTypes.object.isRequired,
  setCredentials: PropTypes.func.isRequired,
  userLogin: PropTypes.func.isRequired,
};
export default Login;
