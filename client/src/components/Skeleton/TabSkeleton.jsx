import { Divider, Skeleton } from '@mui/material';
import React from 'react';

const TabSkeleton = () => (
  <>
    <Skeleton height="10vh" />
    <Divider variant="middle" />
    <Skeleton variant="rectangular" height="55vh" />
  </>
);

export default TabSkeleton;
