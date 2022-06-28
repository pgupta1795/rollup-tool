import * as React from 'react';
import { Box, Grid } from '@mui/material';
import * as ServiceUtils from '../utils/ServiceUtils';
import TypesCard from '../components/Card/typesCard';
import ActionsTable from '../components/TableContainer/ActionsTableContainer';

const HomePage = () => {
  const allMenuItems = ServiceUtils.TYPES.map((type) => (
    <TypesCard type={type} key={type} />
  ));

  return (
    <Box component="div" className="roll-up-home">
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid item container>
          <Grid item xs={11}>
            <ActionsTable allMenuItems={allMenuItems} />
          </Grid>
          <Grid item sx={{ width: '8vw', mt: 1 }}>
            {allMenuItems}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
