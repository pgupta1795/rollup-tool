import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import { StyledDiv } from '../../Styles/StyledDiv';

const CustomBackdrop = ({ loading, children }) =>
  loading ? (
    <StyledDiv>
      <Backdrop
        className="bgColor"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        invisible
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </StyledDiv>
  ) : (
    children
  );

CustomBackdrop.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};
export default CustomBackdrop;
