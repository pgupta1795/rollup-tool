import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { getTableData } from '../../../features/table/structureTableSlice';
import ChipField from '../../Common/ChipField';

const TNRField = () => {
  const tableData = useSelector(getTableData);
  return (
    <>
      <Typography gutterBottom variant="subtitle1">
        {(tableData?.length > 0 && tableData[0]?.name) || ''}
      </Typography>
      <Typography gutterBottom variant="body2" color="text.secondary">
        {(tableData?.length > 0 && tableData[0]?.type) || ''}
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
        <ChipField
          label="Description"
          value={(tableData?.length > 0 && tableData[0]?.description) || ''}
        />
        <ChipField
          label="Owner"
          value={(tableData?.length > 0 && tableData[0]?.owner) || ''}
        />
      </Stack>
    </>
  );
};

export default TNRField;
