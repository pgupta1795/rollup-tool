import { AccountCircle, Link as Http, Send } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import PasswordField from './Fields/passwordField';
import TextField from './Fields/textField';
import FlexBox from '../Common/FlexBox';

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
        <FlexBox>
          <Stack
            direction="column"
            sx={{
              width: '100%',
              padding: '5px',
            }}
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
            <TextField
              credentials={credentials}
              handleChange={handleChange}
              icon={<Http color="primary" />}
              fieldName="3dspace"
              placeholder="https://example.com/3dspace"
              autoComplete=""
            />
            <TextField
              credentials={credentials}
              handleChange={handleChange}
              icon={<Http color="primary" />}
              fieldName="3dpassport"
              placeholder="https://example.com/3dpassport"
              autoComplete=""
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              endIcon={<Send />}
              sx={{
                p: 1.5,
                mt: 3,
              }}
            >
              <Typography component="span">Connect to 3DX</Typography>
            </Button>
          </Stack>
        </FlexBox>
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
