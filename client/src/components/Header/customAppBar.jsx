import { AppBar } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useTheme } from '@mui/material/styles';

export const TopBar = ({ children }) => {
  const theme = useTheme();
  return (
    <AppBar
      position="static"
      sx={{
        background: `linear-gradient(to right, ${theme.palette.primary.dark},${theme.palette.primary.main})`,
      }}
    >
      {children}
    </AppBar>
  );
};

export const BottomBar = ({ children }) => {
  const theme = useTheme();
  return (
    <AppBar
      position="fixed"
      sx={{
        top: 'auto',
        bottom: 0,
        background: `linear-gradient(to right, ${theme.palette.primary.dark},${theme.palette.primary.main})`,
      }}
    >
      {children}
    </AppBar>
  );
};

TopBar.propTypes = {
  children: PropTypes.any.isRequired,
};

BottomBar.propTypes = {
  children: PropTypes.any.isRequired,
};
