import React from 'react';
import { Grid, useTheme } from '@mui/material';
import GraphContainer from './graphContainer';
import ActionsRangeChart from './chartActionsRange';
import ActionsCountChart from './chartActionsCount';

const ActionGraphs = () => {
  const theme = useTheme();
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
  const { primary } = theme.palette;

  return (
    <GraphContainer colors={[primary.main, primary.light]}>
      {render}
    </GraphContainer>
  );
};

export default ActionGraphs;
