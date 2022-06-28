import { Divider, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import Box from '@mui/material/Box';
// import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import ExpandablePanel from '../Card/expandablePanel';
import ChipField from '../Common/ChipField';

const Details = ({ data }) => {
  const header = (
    <Box sx={{ mb: 1, mx: 2 }}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography gutterBottom variant="h5" component="div">
            {data?.name || ''}
          </Typography>
        </Grid>
        <Grid item>
          <Typography gutterBottom variant="h6" component="div">
            {data?.revision || ''}
          </Typography>
        </Grid>
      </Grid>
      <Typography color="text.secondary" variant="body2">
        {data?.type || ''}
      </Typography>
    </Box>
  );

  return (
    <ExpandablePanel summary={<Typography color="primary">Details</Typography>}>
      <>
        {header}
        <Divider variant="middle" />
        <Box sx={{ mt: 1, mx: 2 }}>
          <Typography gutterBottom variant="subtitle1">
            {data?.title || ''}
          </Typography>
          <Stack direction="row" spacing={1}>
            <ChipField label="Description" value={data?.description} />
            <ChipField label="Owner" value={data?.owner} />
            <ChipField label="Created" value={data?.created} />
            <ChipField label="Modified" value={data?.modified} />
          </Stack>
        </Box>
        {/* <BOX SX={{ MT: 3, ML: 1, MB: 1 }}>
        <BUTTON>ADD TO CART</BUTTON>
      </BOX> */}
      </>
    </ExpandablePanel>
  );
};

Details.propTypes = {
  data: PropTypes.object.isRequired,
};
export default Details;
