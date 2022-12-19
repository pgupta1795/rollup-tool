import { Menu, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const PaperMenu = ({ children, ...rest }) => {
  const theme = useTheme();

  return (
    <Menu
      {...rest}
      sx={{
        '& .MuiPaper-root': {
          background: `linear-gradient(to right bottom,${theme.palette.primary.light},${theme.palette.primary.main},${theme.palette.primary.dark} )`,
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'primary.main',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
    >
      {children}
    </Menu>
  );
};

PaperMenu.propTypes = {
  children: PropTypes.any.isRequired,
};
export default PaperMenu;
