import { Avatar, MenuItem } from '@mui/material';
import React from 'react';
import { getUserFullName } from '../../services/AuthService';

const Name = ({ ...rest }) => (
  <MenuItem
    {...rest}
    sx={{
      mt: 1,
    }}
  >
    <Avatar sx={{ bgcolor: 'divider', width: 16, height: 16 }} />
    {getUserFullName()}
  </MenuItem>
);

export default Name;
