import PropTypes from 'prop-types';
import React from 'react';
import GradientBox from '../../../Styles/StyledBox';

const GraphContainer = ({ colors, children, height }) => (
  <GradientBox
    colors={colors}
    sx={{
      padding: '10px',
      minHeight: height,
      mb: 1,
    }}
  >
    {children}
  </GradientBox>
);

GraphContainer.defaultProps = {
  height: '25vh',
};

GraphContainer.propTypes = {
  colors: PropTypes.array.isRequired,
  children: PropTypes.any.isRequired,
  height: PropTypes.string,
};
export default GraphContainer;
