import { Card, CardContent } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const GradientCardContent = ({ children }) => (
  <Card
    sx={{
      // background: `linear-gradient(to right bottom,${theme.palette.primary.light},${theme.palette.primary.main},${theme.palette.primary.dark} )`,
      display: 'flex',
      alignItems: 'start',
      width: 'inherit',
      height: 'inherit',
      minHeight: '120px',
      color: 'primary.main',
    }}
  >
    <CardContent>{children}</CardContent>
  </Card>
);

GradientCardContent.propTypes = {
  children: PropTypes.element.isRequired,
};
export default GradientCardContent;
