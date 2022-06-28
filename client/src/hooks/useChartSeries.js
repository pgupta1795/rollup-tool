import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';

export default (action, options, fn) => {
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
    const series = executeFunction(action?.state.data, 'VPMReference');
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
  }, [action, theme]);

  return state;
};
