import { Typography } from '@mui/material';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { getTableData } from '../../../features/table/structureTableSlice';

const MassTableHeader = memo(() => {
  const tableData = useSelector(getTableData);
  return (
    <Typography variant="h6" color="primary">
      {tableData && tableData.length > 0
        ? `${tableData[0]?.title} - ${tableData[0]?.revision} (MASS)`
        : 'MASS TABLE'}
    </Typography>
  );
});

export default MassTableHeader;
