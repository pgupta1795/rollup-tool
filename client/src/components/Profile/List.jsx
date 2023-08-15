import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import ListItemButton from '@mui/material/ListItemButton';
import React from 'react';

const CustomList = ({ text, icon }) => (
  <ListItem key={text} divider>
    <ListItemButton
      alignItems="center"
      sx={{
        py: 2,
        color: 'rgba(255,255,255,1)',
        px: 1,
        pt: 3,
        '&:hover': {
          backgroundColor: 'primary.dark',
        },
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  </ListItem>
);

CustomList.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};
export default CustomList;
