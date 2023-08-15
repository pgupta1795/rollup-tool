import { FormControlLabel, Switch } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckedForMassField } from '../../../features/rollup/Actions';
import { isCheckedForField } from '../../../features/rollup/rollupSlice';
import toast from '../../../helper/toast';

const RollupMass = ({ attribute, label }) => {
  const dispatch = useDispatch();
  const isMassChecked = useSelector((state) =>
    isCheckedForField(state, attribute)
  );

  const handleChange = (event) => {
    const { title } = event.target.labels[0];
    const isChecked = event.target.checked;
    if (isChecked) toast.info(title, { position: 'bottom-right' });
    dispatch(setCheckedForMassField({ attribute, isChecked }));
  };

  return (
    <FormControlLabel
      control={<Switch onChange={handleChange} checked={isMassChecked} />}
      value={attribute}
      label={label}
      title={`Rollup ${label}`}
      key={attribute}
    />
  );
};

RollupMass.propTypes = {
  attribute: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default RollupMass;
