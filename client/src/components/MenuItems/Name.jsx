import { Avatar, MenuItem } from '@mui/material';
import React from 'react';

const Name = ({ ...rest }) => (
  <MenuItem
    {...rest}
    sx={{
      mt: 1,
    }}
  >
    <Avatar sx={{ bgcolor: 'divider', width: 16, height: 16 }} />
    {`${localStorage.getItem('firstname')} ${localStorage.getItem('lastname')}`}
  </MenuItem>
);

export default Name;
