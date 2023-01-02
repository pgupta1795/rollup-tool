import { Divider, Skeleton } from '@mui/material';
import React from 'react';

const DetailsSkeleton = () => (
  <>
    <Skeleton height="10vh" />
    <Divider variant="middle" />
    <Skeleton height="10vh" />
  </>
);

export default DetailsSkeleton;
