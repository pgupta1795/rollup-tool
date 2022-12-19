import { CurrencyPound } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import GradientCardContent from '../Card/GradientCardContent';

const Cost = () => (
  <>
    <Grid item xs={12} sm={3} md={3}>
      <CurrencyPound />
      <Typography variant="h2" sx={{ textAlign: { md: 'left', xs: 'center' } }}>
        Cost
      </Typography>
      <Typography
        variant="body2"
        sx={{ textAlign: { md: 'left', xs: 'center' } }}
      >
        rollup
      </Typography>
    </Grid>
    <Grid item xs={12} sm={3} md={3}>
      <GradientCardContent>
        <Typography
          variant="body2"
          sx={{ textAlign: { md: 'left', xs: 'center' } }}
        >
          <strong>CAD Cost</strong>
          <br />
          <br />A mass calculated for the product within a PLM system
        </Typography>
      </GradientCardContent>
    </Grid>
    <Grid item xs={12} sm={3} md={3}>
      <GradientCardContent>
        <Typography
          variant="body2"
          sx={{ textAlign: { md: 'left', xs: 'center' } }}
        >
          <strong>Estimated Cost</strong>
          <br />
          Manually entered value that may account for additional material, such
          as oil or other fluids
        </Typography>
      </GradientCardContent>
    </Grid>
    <Grid item xs={12} sm={3} md={3}>
      <GradientCardContent>
        <Typography
          variant="body2"
          sx={{ textAlign: { md: 'left', xs: 'center' } }}
        >
          <strong>Real Cost</strong>
          <br />
          <br />A produced part that has been weighed on a physical scale
        </Typography>
      </GradientCardContent>
    </Grid>
  </>
);

export default Cost;
