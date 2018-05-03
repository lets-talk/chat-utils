import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const classNames = require('classnames');

const TimeMarkMessage = (props) =>
  (
    <div className={classNames('letstalk-container-timemark', props.className)}>
      <div
        className="letstalk-timemark"
      >
        <div className="letstalk-timemark-text">
          {props.text}
        </div>
      </div>
    </div>
  );

TimeMarkMessage.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
};

TimeMarkMessage.defaultProps = {
  text: '',
  className: 'LT-TimeMarkMessage-Container',
};

export default TimeMarkMessage;
