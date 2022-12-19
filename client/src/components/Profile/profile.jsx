import { ArrowRight } from '@mui/icons-material';
import { Avatar, Button, Tooltip } from '@mui/material';
import React from 'react';
import { useAuth } from '../../authentication/auth';
import StorageConstants from '../../helper/StorageConstants';
import { stringAvatar } from '../../utils/CommonUtils';
import ProfileMenu from './profileMenu';

const Profile = () => {
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setAnchorEl(event.currentTarget);
  };

  return auth.cookies.Cookies ? (
    <>
      <Tooltip title="Person Details">
        <Button
          color="inherit"
          onClick={handleClick}
          size="small"
          edge="end"
          aria-label="account of current user"
          aria-controls=""
          aria-haspopup="true"
          sx={{ pointerEvents: 'auto', cursor: 'not-allowed' }}
        >
          <Avatar
            {...stringAvatar(
              `${localStorage.getItem(
                StorageConstants.FirstName
              )} ${localStorage.getItem(StorageConstants.LastName)}`
            )}
          />
          <ArrowRight style={{ pointerEvents: 'auto' }} />
        </Button>
      </Tooltip>
      <ProfileMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </>
  ) : (
    'Cookies Error : Please Logout and Login'
  );
};

export default Profile;
