import { FormControlLabel, Switch } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckedForBestAvailable } from '../../../features/rollup/Actions';
import { isCheckedForField } from '../../../features/rollup/rollupSlice';
import Constants from '../../../helper/Constants';
import toast from '../../../helper/toast';
import {
  BEST_AVAILABLE,
  BEST_AVAILABLE_DB_NAME,
} from '../../../utils/RollupUtils';

const RollupBestAvailable = () => {
  const dispatch = useDispatch();
  const isBestChecked = useSelector((state) =>
    isCheckedForField(state, BEST_AVAILABLE_DB_NAME)
  );

  const handleChange = (event) => {
    const { title } = event.target.labels[0];
    const isChecked = event.target.checked;
    if (isChecked) toast.info(title, { position: 'bottom-right' });
    dispatch(setCheckedForBestAvailable(isChecked));
  };

  return (
    <FormControlLabel
      control={<Switch onChange={handleChange} checked={isBestChecked} />}
      value={BEST_AVAILABLE_DB_NAME}
      label={BEST_AVAILABLE}
      title={Constants.BEST_AVAILABLE}
    />
  );
};

export default RollupBestAvailable;
