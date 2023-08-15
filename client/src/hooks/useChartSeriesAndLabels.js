import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { TYPES } from '../utils/ServiceUtils';

export default (data, options, fn) => {
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
    const [series, labels] = executeFunction(data, TYPES[0] || 'VPMReference');
    setState({
      ...state,
      series,
      options: {
        theme: {
          mode: theme.palette.mode,
          palette: 'palette7',
        },
        labels,
      },
    });
  }, [data, theme]);

  return state;
};
