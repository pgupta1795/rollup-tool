import React from 'react';
import { indigo, deepPurple, purple } from '@mui/material/colors';
import { Grid } from '@mui/material';
import GraphContainer from './graphContainer';
import ActionsRangeChart from './chartActionsRange';
import ActionsCountChart from './chartActionsCount';

const ActionGraphs = () => {
  const render = (
    <Grid
      container
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2 }}
    >
      <Grid item xs={6.9}>
        <ActionsRangeChart />
      </Grid>
      <Grid item xs={5}>
        <ActionsCountChart />
      </Grid>
    </Grid>
  );

  return (
    <GraphContainer colors={[indigo[100], deepPurple[300], purple[300]]}>
      {render}
    </GraphContainer>
  );
};

export default ActionGraphs;
