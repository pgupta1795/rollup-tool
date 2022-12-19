import PropTypes from 'prop-types';
import React, { lazy, useEffect } from 'react';
import { setRowStyle } from '../../Styles/tableStyle';

const StyledSwitch = lazy(() => import('../../Styles/StyledSwitch'));

const ThemeSwitch = ({ checked, setChecked }) => {
  useEffect(() => {
    setRowStyle(!checked);
    return () => {
      setRowStyle(checked);
    };
  }, [checked]);

  const themeChange = () => {
    setChecked((previous) => {
      setRowStyle(previous);
      return !previous;
    });
  };

  return (
    <StyledSwitch
      checked={checked}
      onChange={themeChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
};

ThemeSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
};
export default ThemeSwitch;
