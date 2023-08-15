import { Box, Link, Toolbar } from '@mui/material';
import React, { lazy, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/TECHNIA.png';
import Paths from '../../helper/Paths';
import { getUserName } from '../../services/CookieService';
import ThemeSwitch from '../Common/ThemeSwitch';

const Profile = lazy(() => import('../Profile/profile'));
const TechniaSearch = lazy(() => import('../Search/search'));
const TopBar = lazy(() => import('./customAppBar'));

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getUserName());
    return () => {
      setUser(null);
    };
  }, [navigate]);

  const myLogo = (
    <Link href={Paths.LOGIN} variant="body2">
      <img src={logo} alt="Logo" className="logo_brand_small" />
    </Link>
  );
  const mySearch = <TechniaSearch />;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <TopBar>
        <Toolbar variant="dense">
          {myLogo}
          <Box sx={{ flexGrow: 1 }} />
          {user ? mySearch : ''}
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: 'flex', md: 'flex' } }}
            alignItems="center"
            justifyContent="space-around"
          >
            {!user ? null : <Profile />}
            <ThemeSwitch />
          </Box>
        </Toolbar>
      </TopBar>
    </Box>
  );
};

export default Header;
