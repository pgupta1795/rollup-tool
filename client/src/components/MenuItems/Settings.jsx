import { Settings as SettingsIcon } from '@mui/icons-material';
import { ListItemIcon, MenuItem } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Paths from '../../helper/Paths';

const Settings = ({ ...rest }) => {
  const navigate = useNavigate();

  return (
    <MenuItem {...rest} onClick={() => navigate(`/${Paths.SETTINGS}`)}>
      <ListItemIcon>
        <SettingsIcon fontSize="small" />
      </ListItemIcon>
      Settings
    </MenuItem>
  );
};

export default Settings;
