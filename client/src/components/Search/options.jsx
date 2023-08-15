import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@mui/material';

const Options = ({ props, option }) => (
  <li {...props}>
    <Grid container alignItems="center">
      <Grid item>
        <Box sx={{ color: 'text.secondary', mr: 2 }}>{option.revision}</Box>
      </Grid>
      <Grid item xs>
        <Typography
          component="span"
          variant="subtitle1"
          color="text.secondary"
          style={{
            fontWeight: 700,
          }}
        >
          {option.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Name : {option.name}-{option.revision}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Owner : {option.owner}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description : {option.description}
        </Typography>
      </Grid>
    </Grid>
  </li>
);

Options.propTypes = {
  props: PropTypes.any.isRequired,
  option: PropTypes.object.isRequired,
};
export default Options;
