import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classNames from 'classnames';

// Stylesheet
import './Loader.scss';

const Loader = (props) => {
  const {
    size, active, fullScreen, className,
  } = props;

  const classes = classNames(size, {
    'la-ball-clip-rotate': true,
    'loader-full-screen': active && fullScreen,
    'loader-active': active,
    'loader-hidden': !active,
  }, className);

  const InnerLoaderDiv = styled.div`
    position: fixed;
    left: 50%;
    color: ${(props) => props.theme.palette.primary1Color};
  `;

  return (
    <div className={classes}>
      <InnerLoaderDiv />
    </div>
  );
};

Loader.propTypes = {
  /**
   * Description of prop "theme".
   */
  theme: PropTypes.shape({
    palette: PropTypes.shape({
      primary1Color: PropTypes.string,
      primary2Color: PropTypes.string,
      counterText: PropTypes.string,
    }),
  }),
  /**
   * text: Text to show on the component
   */
  className: PropTypes.string,
  /**
   * image size. default (25px), xsmall(30px), small(35px), medium(40px), large(45px), xlarge (55px)
   */
  size: PropTypes.string,
  /**
   * active: Set the width of the button
   */
  fullScreen: PropTypes.bool,
  active: PropTypes.bool,
};

Loader.defaultProps = {
  theme: {
    palette: {
      primary1Color: '#f33535',
      cntColor: 'white',
      counterText: '',
    },
  },
  size: 'medium',
  className: '',
  active: true,
  fullScreen: false,
};

export default Loader;
