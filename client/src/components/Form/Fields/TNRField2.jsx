import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { getTableData } from '../../../features/table/structureTableSlice';
import Constants from '../../../helper/Constants';
import { roundOff } from '../../../utils/CommonUtils';

const TNRField2 = ({ objectDBData }) => {
  const tableData = useSelector(getTableData);
  return (
    <Box sx={{ mb: 1, mx: 2 }}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography gutterBottom variant="h5" component="div">
            {(tableData?.length > 0 && tableData[0]?.title) || ''}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            {(tableData?.length > 0 && tableData[0]?.revision) || ''}
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
        </Grid>
      </Grid>
    </Box>
  );
};

TNRField2.defaultProps = {
  objectDBData: {},
};

TNRField2.propTypes = {
  objectDBData: PropTypes.object,
};

export default TNRField2;
