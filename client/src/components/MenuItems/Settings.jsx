import { Settings as SettingsIcon } from '@mui/icons-material';
import { ListItemIcon, MenuItem } from '@mui/material';
import React from 'react';

const Settings = ({ ...rest }) => (
  <MenuItem {...rest}>
    <ListItemIcon>
      <SettingsIcon fontSize="small" />
    </ListItemIcon>
    Settings
  </MenuItem>
);

export default Settings;
