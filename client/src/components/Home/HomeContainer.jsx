import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { ReactComponent as HomePageSVG } from '../../assets/svg/homepage.svg';
import {
  CLASSNAME_COST_DESC,
  CLASSNAME_COST_VIEW,
  CLASSNAME_WEIGHT_DESC,
  CLASSNAME_WEIGHT__VIEW,
  handleHover,
} from '../../helper/EventListeners';
import Paths from '../../helper/Paths';
import {
  getCostAttributeDetails,
  getMassAttributeDetails,
  TYPES,
} from '../../utils/ServiceUtils';
import TypesCard from '../Card/typesCard';
import AttributesDescription from './AttributesDescription';
import Welcome from './Welcome';

const HomeContainer = () => {
  const allMenuItems = TYPES.map((type) => (
    <TypesCard type={type} key={type} path={`/${Paths.TYPE}/${type}`} />
  ));

  useEffect(() => {
    const removeCostListeners = handleHover(
      CLASSNAME_COST_VIEW,
      CLASSNAME_COST_DESC
    );
    const removeWeightListeners = handleHover(
      CLASSNAME_WEIGHT__VIEW,
      CLASSNAME_WEIGHT_DESC
    );

    return () => {
      removeCostListeners();
      removeWeightListeners();
    };
  }, []);

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="stretch"
      id="home-page-grid-container"
      rowGap={3}
      columnGap={1}
    >
      <Grid item md={8} xs={12} style={{ '--delay': '1200ms' }}>
        <HomePageSVG />
      </Grid>
      <Grid container item md={3} sm={12} xs={12} alignSelf="center">
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          style={{ '--delay': '600ms' }}
          className="scale-on-hover"
        >
          <TypesCard type={Paths.DASHBOARD} path={`/${Paths.DASHBOARD}`} />
        </Grid>
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          style={{ '--delay': '900ms' }}
          className="scale-on-hover"
        >
          {allMenuItems}
        </Grid>
      </Grid>
      <Grid
        item
        md={4}
        sm={12}
        xs={12}
        style={{ '--delay': '1500ms' }}
        id={CLASSNAME_COST_DESC}
      >
        <AttributesDescription attributes={getCostAttributeDetails()} />
      </Grid>
      <Grid
        item
        md={4}
        sm={12}
        xs={12}
        style={{ '--delay': '1500ms' }}
        id={CLASSNAME_WEIGHT_DESC}
      >
        <AttributesDescription attributes={getMassAttributeDetails()} />
      </Grid>
      <Grid item md={3} sm={12} xs={12} style={{ '--delay': '300ms' }}>
        <Welcome />
      </Grid>
    </Grid>
  );
};

export default HomeContainer;
