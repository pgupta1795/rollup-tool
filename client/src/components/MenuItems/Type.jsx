import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { ListItemIcon, MenuItem } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Paths from '../../helper/Paths';
import * as ServiceUtils from '../../utils/ServiceUtils';

const Type = ({ ...rest }) => {
  const navigate = useNavigate();

  return ServiceUtils.TYPES.map((type) => (
    <MenuItem
      type={type}
      key={type}
      {...rest}
      onClick={() => navigate(`/${Paths.TYPE}/${type}`)}
    >
      <ListItemIcon>
        <FormatListBulletedIcon fontSize="small" />
      </ListItemIcon>
      {type}
    </MenuItem>
  ));
};

export default Type;
