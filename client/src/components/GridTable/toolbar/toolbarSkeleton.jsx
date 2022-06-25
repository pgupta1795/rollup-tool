import { Box, Skeleton } from '@mui/material';
import React from 'react';

const ToolbarSkeleton = () => (
  <Box
    sx={{
      display: 'flex',
      columnGap: '10px',
    }}
  >
    <Skeleton variant="circular" width={30} height={30} />
    <Skeleton variant="circular" width={30} height={30} />
  </Box>
);

export default ToolbarSkeleton;
