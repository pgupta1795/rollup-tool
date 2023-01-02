import { Grid, useTheme } from '@mui/material';
import React from 'react';
import CountChart from '../Actions/CountChart';
import RangeChart from '../Actions/RangeChart';
import GraphContainer from './GraphContainer';

const ActionGraphsContainer = () => {
  const theme = useTheme();
  const { primary } = theme.palette;

  return (
    <GraphContainer colors={[primary.main, primary.light]}>
      <Grid
        container
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2 }}
      >
        <Grid item xs={6.9}>
          <RangeChart />
        </Grid>
        <Grid item xs={5}>
          <CountChart />
        </Grid>
      </Grid>
    </GraphContainer>
  );
};

export default ActionGraphsContainer;
