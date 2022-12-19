import * as React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CalculationMenu from './CalculationMenu';
import StyledMenu from '../../../Styles/StyledMenu';
import CalculateAll from './CalculateAll';

const RollupMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="flex-column-box">
        <Button
          id="demo-customized-button"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="outlined"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          size="small"
        >
          Rollup
        </Button>
        <CalculateAll />
      </div>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem disableRipple>
          <CalculationMenu func={handleClose} />
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default RollupMenu;
