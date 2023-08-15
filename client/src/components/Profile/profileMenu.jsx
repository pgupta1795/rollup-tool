import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../authentication/auth';
import Paths from '../../helper/Paths';
import { getUserName } from '../../services/CookieService';
import { URL } from '../../utils/ServiceUtils';
import PaperMenu from '../Common/PaperMenu';
import BrandItem from '../MenuItems/BrandItem';
import Dashboard from '../MenuItems/Dashboard';
import Home from '../MenuItems/Home';
import Logout from '../MenuItems/Logout';
import Name from '../MenuItems/Name';
import SecurityContext from '../MenuItems/SecurityContext';
import Settings from '../MenuItems/Settings';
import Type from '../MenuItems/Type';
import SecurityContextModal from './securityContextModal';

const ProfileMenu = ({ anchorEl, setAnchorEl }) => {
  const openAchor = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClose = () => setAnchorEl(null);
  const auth = useAuth();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <PaperMenu
        anchorEl={anchorEl}
        id="account-menu"
        open={openAchor}
        onClose={handleClose}
        onClick={handleClose}
      >
        <BrandItem />
        <Divider
          sx={{
            borderBottomWidth: 2,
          }}
        />
        <Name />
        <Divider />
        <Home />
        <Dashboard />
        <Type />
        <Divider />
        <SecurityContext
          onClick={() => {
            setOpen(true);
          }}
        />
        <Settings />
        <Logout
          onClick={() => {
            auth.logout(URL.PASSPORT_URL, getUserName());
            const path = Paths.LOGIN;
            navigate(path);
          }}
        />
      </PaperMenu>
      <SecurityContextModal open={open} setOpen={setOpen} />
    </>
  );
};

ProfileMenu.defaultProps = {
  anchorEl: () => null,
};

ProfileMenu.propTypes = {
  anchorEl: PropTypes.any,
  setAnchorEl: PropTypes.func.isRequired,
};
export default ProfileMenu;
