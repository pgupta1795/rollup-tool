import { Grid } from '@mui/material';
import { deepPurple, indigo, purple } from '@mui/material/colors';
import React from 'react';
import AttributesChart from './chartAttributes';
import StatesChart from './chartStates';
import MassDistributionChart from './chartMassDistribution';
import AttributesBarChart from './chartAttributesBar';
import GraphContainer from './graphContainer';

const ObjectGraphs = () => (
  <GraphContainer
    colors={[indigo[100], deepPurple[300], purple[300]]}
    height="90vh"
  >
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

export default ObjectGraphs;
