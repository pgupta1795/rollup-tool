import { Refresh as RefreshIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import React from 'react';
import TableButton from './TableButton';

const Refresh = ({ table }) => {
  const handleRefresh = () => {
    table.getSelectedRowModel().flatRows.forEach((row) => {
      alert(`deactivating ${row.getValue('name')}`);
    });
  };
  return (
    <TableButton onClick={handleRefresh} title="Refresh Table Data">
      <RefreshIcon />
    </TableButton>
  );
};

Refresh.propTypes = {
  table: PropTypes.any.isRequired,
};
export default Refresh;
