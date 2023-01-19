import { Grid } from '@mui/material';
import React from 'react';
import History from '../components/Home/History';
import HomeContainer from '../components/Home/HomeContainer';

const HomePage = () => (
  <Grid
    container
    justifyContent="space-between"
    alignItems="stretch"
    sx={{ my: { md: '2em', sm: '5em' }, px: 5 }}
    gap={0.5}
  >
    <Grid item md={9} xs={12}>
      <HomeContainer />
    </Grid>
    <Grid item md={2.5} xs={12} alignSelf="center">
      <History />
    </Grid>
  </Grid>
);

export default HomePage;
