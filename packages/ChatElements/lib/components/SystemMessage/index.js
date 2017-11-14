import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const classNames = require('classnames');

const SystemMessage = (props) =>
  (
    <div className={classNames('letstalk-container-smsg', props.className)}>
      <div
        className="letstalk-smsg"
      >
        <div className="letstalk-smsg-text">
          {props.text}
        </div>
      </div>
    </div>
  );

SystemMessage.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
};
export default SystemMessage;
