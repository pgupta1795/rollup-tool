import React from 'react';
import PropTypes from 'prop-types';
import { Pagination as TablePagination } from '@mui/material';

const MyPagination = ({ current, onChange }) => (
  <div
    style={{
      display: 'flex',
      gap: '5px',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <TablePagination
      size="small"
      component="div"
      shape="rounded"
      color="primary"
      count={current + 1}
      onChange={onChange}
    />
  </div>
);

MyPagination.propTypes = {
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default MyPagination;
