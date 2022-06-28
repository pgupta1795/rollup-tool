import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';

export default (objects, options, fn) => {
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
    const [series, labels] = executeFunction(
      objects?.state.data,
      'VPMReference'
    );
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
  }, [objects, theme]);

  return state;
};
