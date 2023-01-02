import { Checkbox } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleEndItemChange } from '../../../features/table/Actions';
import toast from '../../../helper/toast';

const EndItemCell = ({ cell, row, column }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(cell.getValue()?.toLocaleString().toLowerCase() === 'true');
    return () => {
      setChecked();
    };
  }, [cell]);

  const handleChange = async (event) => {
    try {
      const newValue = event.target.checked;
      const dataItem = {
        ...row.original,
        ...{ [column.id]: newValue },
      };
      await dispatch(handleEndItemChange({ dataItem, column, newValue }));
      setChecked(newValue);
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  return <Checkbox onChange={handleChange} checked={checked} />;
};

EndItemCell.propTypes = {
  cell: PropTypes.object.isRequired,
  row: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired,
  // table: PropTypes.object.isRequired,
};

export default EndItemCell;
