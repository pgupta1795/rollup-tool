import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeTheme } from '../../features/theme/themeSlice';
import useMode from '../../hooks/useMode';
import { getStoreTheme, setStoreTheme } from '../../services/AuthService';
import StyledSwitch from '../../Styles/StyledSwitch';

const ThemeSwitch = () => {
  const dispatch = useDispatch();
  const systemTheme = useMode();
  const storeTheme = getStoreTheme();
  const [checked, setChecked] = useState(
    storeTheme ? storeTheme === 'dark' : systemTheme === 'dark'
  );

  const themeChange = () => {
    setChecked((previous) => {
      setStoreTheme(!previous ? 'dark' : 'light');
      return !previous;
    });
  };

  useEffect(() => {
    dispatch(changeTheme(checked ? 'dark' : 'light'));
  }, [checked]);

  return (
    <StyledSwitch
      checked={checked}
      onChange={themeChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
};

export default ThemeSwitch;
