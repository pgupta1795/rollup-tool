import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckedForMassField } from '../../../features/rollup/Actions';
import {
  isCheckedForAll,
  isCheckedForAny,
  setCheckedForAll,
} from '../../../features/rollup/rollupSlice';
import Constants from '../../../helper/Constants';
import toast from '../../../helper/toast';
import { getMassAttributeNames } from '../../../utils/ServiceUtils';

const RollupAll = () => {
  const dispatch = useDispatch();
  const isAllChecked = useSelector(isCheckedForAll);
  const isAnyChecked = useSelector(isCheckedForAny);

  const handleChange = (event) => {
    const { title } = event.target.labels[0];
    const isChecked = event.target.checked;
    if (isChecked) toast.info(title, { position: 'bottom-right' });
    dispatch(setCheckedForAll(isChecked));
    getMassAttributeNames().forEach((attribute) => {
      dispatch(setCheckedForMassField({ attribute, isChecked }));
    });
  };

  return (
    <FormControlLabel
      label="All"
      title={Constants.CALCULATE_ALL}
      control={
        <Checkbox
          checked={isAllChecked}
          indeterminate={isAnyChecked}
          onChange={handleChange}
        />
      }
    />
  );
};

export default RollupAll;
