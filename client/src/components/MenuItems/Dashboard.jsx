import { Window as DashboardIcon } from '@mui/icons-material';
import { ListItemIcon, MenuItem } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Paths from '../../helper/Paths';

const Dashboard = ({ ...rest }) => {
  const navigate = useNavigate();

  return (
    <MenuItem {...rest} onClick={() => navigate(`/${Paths.DASHBOARD}`)}>
      <ListItemIcon>
        <DashboardIcon fontSize="small" />
      </ListItemIcon>
      Dashboard
    </MenuItem>
  );
};

export default Dashboard;
