import { Box } from '@mui/material';
import React from 'react';
import TypesCard from '../components/Card/typesCard';
import ActionsTable from '../components/TableContainer/ActionsTableContainer';
import Paths from '../helper/Paths';
import * as ServiceUtils from '../utils/ServiceUtils';

const DashboardPage = () => {
  const allMenuItems = ServiceUtils.TYPES.map((type) => (
    <TypesCard type={type} key={type} path={`/${Paths.TYPE}/${type}`} />
  ));

  return (
    <Box component="div" className="roll-up-home content-height-without-topbar">
      {/* <Grid container sx={{ justifyContent: 'center' }}>
        <Grid item container>
          <Grid item xs={11}> */}
      <ActionsTable allMenuItems={allMenuItems} />
      {/* </Grid> */}
      {/* <Grid item sx={{ width: '8vw', mt: 1 }}>
            {allMenuItems}
          </Grid> */}
      {/* </Grid>
      </Grid> */}
    </Box>
  );
};

export default DashboardPage;
