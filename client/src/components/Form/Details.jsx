import { Divider, Skeleton, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, { useCallback, useContext, useState } from 'react';
import Constants from '../../helper/Constants';
import { getTypeObjectById } from '../../helper/TypeObjectApi';
import { ObjectContext } from '../../hooks/contexts';
import { roundOff } from '../../utils/CommonUtils';
import ExpandablePanel from '../Card/expandablePanel';
import ChipField from '../Common/ChipField';
import ActualMassField from './Fields/actualMassField';
import CalculatedMassField from './Fields/CalculatedMassField';
import EstimatedMassField from './Fields/EstimatedMassField';

const Details = () => {
  const object = useContext(ObjectContext);
  const [objectDBData, setObjectDBData] = useState();

  const header = (
    <Box sx={{ mb: 1, mx: 2 }}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography gutterBottom variant="h5" component="div">
            {object.state?.data[0]?.title || ''}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            {object.state?.data[0]?.revision || ''}
          </Typography>
        </Grid>
        <Grid item>
          <div>
            <Typography
              gutterBottom
              variant="h6"
              title={Constants.BEST_AVAILABLE}
            >
              Best Available Mass :{' '}
              <Typography
                component="span"
                gutterBottom
                variant="h5"
                color="primary"
              >
                <strong>
                  {roundOff(
                    Number(objectDBData?.bestAvailable?.$numberDecimal)
                  ) || ''}
                </strong>
              </Typography>
            </Typography>
          </div>
          <div className="no-display">
            <Typography
              gutterBottom
              variant="h5"
              color="primary"
              title={Constants.BEST_AVAILABLE_V2}
            >
              Best Available Mass V2 :{' '}
              {objectDBData?.bestAvailableV2?.$numberDecimal || ''}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Box>
  );

  const fetchData = useCallback(async () => {
    const id = object.state.data[0] && object.state.data[0].id;
    if (!id) return;
    const response = await getTypeObjectById(id);
    if (!response) return;
    setObjectDBData(response);
  }, [object]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <ExpandablePanel summary={<Typography color="primary">Details</Typography>}>
      {object?.loading ? (
        <>
          <Skeleton height="10vh" />
          <Divider variant="middle" />
          <Skeleton height="10vh" />
        </>
      ) : (
        <>
          {header}
          <Divider variant="middle" />
          <Grid container sx={{ gridTemplateColumns: 'auto 10fr auto' }}>
            <Box sx={{ mt: 1, mx: 2 }}>
              <Typography gutterBottom variant="subtitle1">
                {object.state?.data[0]?.name || ''}
              </Typography>
              <Typography gutterBottom variant="body2" color="text.secondary">
                {object.state?.data[0]?.type || ''}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <ChipField
                  label="Description"
                  value={object.state?.data[0]?.description || ''}
                />
                <ChipField
                  label="Owner"
                  value={object.state?.data[0]?.owner || ''}
                />
              </Stack>
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
              <ActualMassField objectDBData={objectDBData} />
              <Divider orientation="vertical" flexItem />
              <EstimatedMassField objectDBData={objectDBData} />
              <Divider orientation="vertical" flexItem />
              <CalculatedMassField objectDBData={objectDBData} />
            </Stack>
          </Grid>
        </>
      )}
    </ExpandablePanel>
  );
};

export default Details;
