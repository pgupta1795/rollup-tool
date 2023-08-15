import { AccountTree } from '@mui/icons-material';
import { ListItemIcon, MenuItem } from '@mui/material';
import React from 'react';

const SecurityContext = ({ ...rest }) => (
  <MenuItem {...rest}>
    <ListItemIcon>
      <AccountTree fontSize="small" />
    </ListItemIcon>
    Security Context
  </MenuItem>
);

export default SecurityContext;
