import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import GradientCardContent from '../Card/GradientCardContent';

const AttributesDescription = ({ attributes }) => (
  <GradientCardContent>
    <Typography
      variant="body2"
      sx={{ textAlign: { md: 'left', xs: 'center' } }}
    >
      {attributes.map(({ Label, description }) => (
        <React.Fragment key={Label}>
          <strong>{Label} : </strong>
          {description}
          <br />
        </React.Fragment>
      ))}
    </Typography>
  </GradientCardContent>
);

AttributesDescription.propTypes = {
  attributes: PropTypes.array.isRequired,
};

export default AttributesDescription;
