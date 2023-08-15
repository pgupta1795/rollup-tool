import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import { ReactComponent as RollupSVG } from '../../assets/svg/rollup.svg';

const LoginLayout = ({ children }) => (
  <Grid container component="main">
    <Grid item xs={false} sm={false} md={7} className="flex-column-box">
      <Grid component="div">
        <RollupSVG />
      </Grid>
      <Typography
        sx={{
          typography: { xs: 'caption', sm: 'h6', md: 'h4' },
        }}
        className="app-title"
      >
        {document.title.toUpperCase()}
      </Typography>
    </Grid>
    <Grid item xs={12} sm={8} md={5} component="div" square="true">
      {children}
    </Grid>
  </Grid>
);

LoginLayout.propTypes = {
  children: PropTypes.any.isRequired,
};
export default LoginLayout;
