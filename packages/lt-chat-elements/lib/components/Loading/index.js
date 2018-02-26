import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';

const Loading = ({ isLoading, pastDelay, error }) => {
  if (isLoading && pastDelay) {
    return <Loader active type="ball-clip-rotate" size="large" />;
  } else if (error && !isLoading) {
    return <p>Error!</p>;
  }
  return null;
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
  pastDelay: PropTypes.number,
  error: PropTypes.object,
};

export default Loading;
