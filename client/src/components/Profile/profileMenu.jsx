import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { AccountTree } from '@mui/icons-material';
import { useAuth } from '../../authentication/auth';
import Paths from '../../helper/Paths';
import SecurityContextModal from './securityContextModal';

const AccountMenu = ({ anchorEl, setAnchorEl }) => {
  const openAchor = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClose = () => setAnchorEl(null);
  const auth = useAuth();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openAchor}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar sx={{ bgcolor: 'primary.main', width: 16, height: 16 }} />
          {`${localStorage.getItem('firstname')} ${localStorage.getItem(
            'lastname'
          )}`}
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            setOpen(true);
          }}
        >
          <ListItemIcon>
            <AccountTree fontSize="small" color="primary" />
          </ListItemIcon>
          Security Context
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" color="primary" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            auth.logout();
            const path = Paths.LOGIN;
            navigate(path);
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" color="primary" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <SecurityContextModal open={open} setOpen={setOpen} />
    </>
  );
};

AccountMenu.defaultProps = {
  anchorEl: () => null,
};

AccountMenu.propTypes = {
  anchorEl: PropTypes.any,
  setAnchorEl: PropTypes.func.isRequired,
};
export default AccountMenu;
