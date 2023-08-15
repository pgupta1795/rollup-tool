import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const topScroll = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

const withRouter = (Component) =>
  function (props) {
    const location = useLocation();
    return <Component {...props} location={location} />;
  };

const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) {
      topScroll();
    }
  }, [location]);

  return children;
};

ScrollToTop.propTypes = {
  children: PropTypes.any.isRequired,
};
export default withRouter(ScrollToTop);
