import { Logout as LogoutIcon } from '@mui/icons-material';
import { ListItemIcon, MenuItem } from '@mui/material';
import React from 'react';

const Logout = ({ ...rest }) => (
  <MenuItem {...rest}>
    <ListItemIcon>
      <LogoutIcon fontSize="small" />
    </ListItemIcon>
    Logout
  </MenuItem>
);

export default Logout;
