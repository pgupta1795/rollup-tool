import { Container, Grid } from '@mui/material';
import React from 'react';
import TypesCard from '../components/Card/typesCard';
import Cost from '../components/Home/Cost';
import Weight from '../components/Home/Weight';
import Welcome from '../components/Home/Welcome';
import Paths from '../helper/Paths';
import '../Styles/css/homePage.css';
import * as ServiceUtils from '../utils/ServiceUtils';

const HomePage = () => {
  const allMenuItems = ServiceUtils.TYPES.map((type) => (
    <TypesCard type={type} key={type} path={`/${Paths.TYPE}/${type}`} />
  ));

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: 'calc(100vh - 108px);',
      }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="stretch"
        sx={{
          mt: { md: '2rem', sm: '20px' },
        }}
        rowGap={3}
      >
        <Grid item md={3} sm={12} xs={12} alignSelf="center">
          <Welcome />
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <TypesCard type={Paths.DASHBOARD} path={`/${Paths.DASHBOARD}`} />
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          {allMenuItems}
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
          container
          justifySelf="space-between"
          height="inherit"
          sx={{
            mt: 5,
          }}
          columnSpacing={3}
        >
          <Cost />
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
          container
          justifySelf="space-between"
          height="inherit"
          sx={{
            mt: 5,
          }}
          columnSpacing={3}
        >
          <Weight />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
