import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

const Avatar = (props) =>
  (
    <div className={classnames('letstalk-avatar-container', props.type, props.size, props.className)}>
      <div className="letstalk-avatar-inner">
        <div className="letstalk-avatar-image-container">
          <img alt={props.alt} src={props.src} className="letstalk-avatar-image" />
          <div className="letstalk-avatar-image-div"></div>
          {props.sideElement}
        </div>
      </div>

      {props.withStatus && <div className={classnames('letstalk-avatar-status', props.status)}>&nbsp;</div>}
    </div>
  );

Avatar.defaultProps = {
  type: 'circle',
  size: 'medium',
  withStatus: false,
  status: '',
  src: '',
  alt: '',
};

Avatar.propTypes = {
  /**
   * types: default, circle, rounded(border radius 5px), flexible
   */
  type: PropTypes.string,
  /**
   * image size. default (25px), xsmall(30px), small(35px), medium(40px), large(45px), xlarge (55px)
   */
  size: PropTypes.string,
  /**
   * image src attribute.
   */
  src: PropTypes.string,
  /**
   * Status choose wheter or not show an status indicator.
   */
  withStatus: PropTypes.bool,
  /**
   * Status choose what kind of status to show. Currently supports: ['online', 'offline', 'sleeping'].
   */
  status: PropTypes.string,
  /**
   * Extra className to style the component
   */
  className: PropTypes.string,
  /**
   * Image alt attribute.
   */
  alt: PropTypes.object,
};

export default Avatar;
