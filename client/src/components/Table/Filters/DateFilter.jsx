import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import PropTypes from 'prop-types';
import React from 'react';

const DateFilter = ({ column }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      onChange={(newValue) => {
        column.setFilterValue(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          helperText="Filter Mode: Less Than"
          sx={{ minWidth: '120px' }}
          variant="standard"
        />
      )}
      value={column.getFilterValue()}
    />
  </LocalizationProvider>
);

DateFilter.propTypes = {
  column: PropTypes.any.isRequired,
};

export default DateFilter;
