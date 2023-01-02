import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

export default (actions, options, fn) => {
  const theme = useTheme();
  const [state, setState] = useState({
    ...options,
    theme: {
      mode: theme.palette.mode,
      palette: 'palette7',
    },
  });
  const executeFunction = fn.bind(this);

  useEffect(() => {
    const series = executeFunction(actions, 'VPMReference');
    setState({
      ...state,
      series,
      options: {
        theme: {
          mode: theme.palette.mode,
          palette: 'palette7',
        },
      },
    });
  }, [actions, theme]);

  return state;
};
