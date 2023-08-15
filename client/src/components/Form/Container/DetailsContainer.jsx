import { Divider, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import ExpandablePanel from '../../Card/expandablePanel';
import DetailsSkeleton from '../../Skeleton/DetailsSkeleton';
import TNRField from '../Fields/TNRField';
import TNRField2 from '../Fields/TNRField2';

const DetailsContainer = ({ objectDBData, isLoading, children }) => (
  <ExpandablePanel
    summary={<Typography color="primary">DETAILS</Typography>}
    initialExpand
  >
    {isLoading ? (
      <DetailsSkeleton />
    ) : (
      <>
        <TNRField2 objectDBData={objectDBData} />
        <Divider variant="middle" />
        <Grid container sx={{ gridTemplateColumns: 'auto 10fr auto' }}>
          <Box sx={{ mt: 1, mx: 2 }}>
            <TNRField />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mt: 1,
              mx: 2,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}
          >
            {children}
          </Stack>
        </Grid>
      </>
    )}
  </ExpandablePanel>
);

DetailsContainer.defaultProps = {
  objectDBData: {},
};

DetailsContainer.propTypes = {
  children: PropTypes.array.isRequired,
  objectDBData: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
};
export default DetailsContainer;
