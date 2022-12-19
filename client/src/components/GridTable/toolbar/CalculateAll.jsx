import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import FunctionsIcon from '@mui/icons-material/Functions';
import { ObjectContext } from '../../../hooks/contexts';
import {
  rollup,
  calculate,
  BEST_AVAILABLE,
  ACTUAL_MASS,
  ESTIMATED_MASS,
  CALCULATED_MASS,
} from '../rollupUtils';

const CalculateAll = () => {
  const [loading, setLoading] = useState(false);
  const { state, setState, oldRows } = useContext(ObjectContext);

  const handleCalculate = () => {
    setLoading(true);
    const { data: rows } = state;

    let newRows = rollup(ACTUAL_MASS, rows);
    calculate(newRows, ACTUAL_MASS);

    newRows = rollup(ESTIMATED_MASS, newRows);
    calculate(newRows, ESTIMATED_MASS);

    newRows = rollup(CALCULATED_MASS, newRows);
    calculate(newRows, CALCULATED_MASS);

    calculate(rows, BEST_AVAILABLE);
    setState({ ...state, data: oldRows, rollup: [] });
    setLoading(false);
  };

  return (
    <Button
      variant="outlined"
      size="small"
      startIcon={<FunctionsIcon />}
      onClick={() => handleCalculate()}
    >
      {loading ? 'Loading ...' : 'Calculate All'}
    </Button>
  );
};

export default CalculateAll;
