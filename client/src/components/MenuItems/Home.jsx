import { Home as HomeIcon } from '@mui/icons-material';
import { ListItemIcon, MenuItem } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Paths from '../../helper/Paths';

const Home = ({ ...rest }) => {
  const navigate = useNavigate();

  return (
    <MenuItem {...rest} onClick={() => navigate(`/${Paths.HOME}`)}>
      <ListItemIcon>
        <HomeIcon fontSize="small" />
      </ListItemIcon>
      Home
    </MenuItem>
  );
};

export default Home;
