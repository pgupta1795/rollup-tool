import { Grid, useTheme } from '@mui/material';
import React from 'react';
import AttributesBarChart from '../Objects/AttributesBarChart';
import AttributesChart from '../Objects/AttributesChart';
import MassDistributionChart from '../Objects/MassDistributionChart';
import StatesChart from '../Objects/StatesChart';
import GraphContainer from './GraphContainer';

const ObjectGraphsContainer = () => {
  const theme = useTheme();
  const { primary } = theme.palette;

  return (
    <GraphContainer colors={[primary.main, primary.light]} height="90vh">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <StatesChart />
        </Grid>
        <Grid item xs={4}>
          <MassDistributionChart />
        </Grid>
        <Grid item xs={5}>
          <AttributesBarChart />
        </Grid>
        <Grid item xs={12}>
          <AttributesChart />
        </Grid>
      </Grid>
    </GraphContainer>
  );
};

export default ObjectGraphsContainer;
