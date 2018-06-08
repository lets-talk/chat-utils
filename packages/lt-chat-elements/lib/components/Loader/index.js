import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Stylesheet
import './index.scss';

const Loader = (props) => {
  const ballTypes = {
    'ball-beat': 3,
    'ball-pulse': 3,
    'ball-pulse-sync': 3,
    'single-ball-beat': 2,
    'ball-clip-rotate': 1,
  };

  const renderDiv = (n, color) => {
    const styles = {};
    if (props.color) {
      if (props.type !== 'ball-clip-rotate') {
        styles.backgroundColor = color;
      }
      styles.borderTopColor = color;
      styles.borderRightColor = color;
      styles.borderLeftColor = color;
    }
    return <div key={n} className="letstalk-ball-div" style={styles} />;
  };

  const {
    type, size, active, fullScreen, className, color,
  } = props;
  const classes = classNames({
    'letstalk-loader': true,
    'letstalk-loader-active-full-screen': active && fullScreen,
    'letstalk-loader-active': active,
    'letstalk-loader-hidden': !active,
  }, className);
  const balls = [];
  for (let i = 0; i < ballTypes[type]; i += 1) {
    balls.push(renderDiv(i, color));
  }
  return (
    <div className={classes}>
      <div className={`letstalk-loader-inner letstalk-${type} ${size}`}>
        {balls}
      </div>
    </div>
  );
};

Loader.propTypes = {
  /**
   * If true, show the loader otherwise hide it.
   */
  active: PropTypes.bool,
  /**
   * A space-delimited list of class names to pass along to the component.
   */
  className: PropTypes.string,
  /**
   * Hexadecimal color used for the balls on the loader.
   */
  color: (myprops, propName, componentName) => {
    if (!myprops[propName]) {
      // When no color specified default is false, let it pass validation
      return null;
    }
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(myprops[propName])) {
      return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`);
    }
    return null;
  },
  /**
   * Loader size. xsmall(30px), small(35px), medium(40px), large(45px), xlarge (55px)
   */
  size: PropTypes.string,
  /**
   * If true show loader in fullScreen making the background opacity be 0.5
   */
  fullScreen: PropTypes.bool,
  /**
   * Type of the loader.
   * Currently ['ball-beat', 'ball-pulse', 'ball-pulse-sync', 'single-ball-beat'] availables
   */
  type: PropTypes.oneOf(['ball-beat', 'ball-pulse', 'ball-clip-rotate', 'ball-pulse-sync', 'single-ball-beat']),
};

Loader.defaultProps = {
  active: false,
  fullScreen: false,
  type: 'ball-pulse',
  color: '#ff5732',
  className: undefined,
};

export default Loader;
