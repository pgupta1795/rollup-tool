import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import StyledMenu from '../../Styles/StyledMenu';
import TableButton from '../Button/TableButton';
import CalculationMenu from './CalculationMenu';

const RollupMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TableButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Rollup
      </TableButton>
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem disableRipple>
          <CalculationMenu func={handleClose} />
        </MenuItem>
      </StyledMenu>
    </>
  );
};

export default RollupMenu;
