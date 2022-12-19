import { Box, Link, Toolbar, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { lazy } from 'react';
import logo from '../../assets/TECHNIA.png';
import { useAuth } from '../../authentication/auth';
import Paths from '../../helper/Paths';
import ThemeSwitch from '../Common/ThemeSwitch';

const Profile = lazy(() => import('../Profile/profile'));
const TechniaSearch = lazy(() => import('../Search/search'));
const TopBar = lazy(() => import('./customAppBar'));

const Header = ({ checked, setChecked }) => {
  const auth = useAuth();
  const hasCookies = auth.cookies?.Cookies;

  const myLogo = (
    <Link href={Paths.LOGIN} variant="body2">
      <img src={logo} alt="Logo" className="logo_brand_small" />
    </Link>
  );
  const myTool = (
    <Typography
      variant="h5"
      color="white"
      sx={{
        display: {
          xs: 'none',
          sm: 'block',
        },
      }}
    >
      {document.title}
    </Typography>
  );
  const mySearch = <TechniaSearch />;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <TopBar>
        <Toolbar variant="dense">
          {myLogo}
          <Box sx={{ flexGrow: 1 }} />
          {hasCookies ? mySearch : ''}
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: 'flex', md: 'flex' } }}
            alignItems="center"
            justifyContent="space-around"
          >
            {!hasCookies ? myTool : <Profile />}
            <ThemeSwitch checked={checked} setChecked={setChecked} />
          </Box>
        </Toolbar>
      </TopBar>
    </Box>
  );
};

Header.propTypes = {
  checked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
};
export default Header;
