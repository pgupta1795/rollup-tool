import { Grid } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../authentication/auth';
import CustomBackdrop from '../components/Card/backdrop';
import Footer from '../components/Footer/footer';
import Login from '../components/Form/login';
import '../Styles/css/Login.css';

const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [credentials, setCredentials] = React.useState({
    username: '',
    password: '',
    '3dspace': auth.cookies['3dspace'] || '',
    CSRF_TOKEN: '',
    Cookies: '',
    '3dpassport': auth.cookies['3dpassport'] || '',
  });

  return (
    <CustomBackdrop loading={auth.progress}>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        className="content-height-without-topbar"
      >
        <Grid item sx={{ width: '100%', height: '90%' }}>
          <Login
            userLogin={(e) => {
              e.preventDefault();
              auth.login(credentials, location, navigate);
            }}
            credentials={credentials}
            setCredentials={setCredentials}
          />
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </CustomBackdrop>
  );
};

export default LoginPage;
