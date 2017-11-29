import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FaCloudDownload from 'react-icons/lib/fa/cloud-download';

import './index.scss';

const PhotoMessage = (props) => (
  <div className={classNames('letstalk-mbox-attachment', 'letstalk-mbox-photo')}>
    <div
      className="letstalk-mbox-photo--img"
      style={props.data.width && props.data.height && {
        width: props.data.width,
        height: props.data.height,
      }}
    >
      <img
        tabIndex={0}
        role="button"
        src={props.data.uri}
        alt={props.data.alt}
        onClick={props.onOpen}
        onKeyPress={props.onOpen}
      />
      {
        props.data.status &&
          !props.data.status.download &&
          <div className="letstalk-mbox-photo--img__block">
            {
              !props.data.status.click &&
              <button
                onClick={props.onDownload}
                className="letstalk-mbox-photo--img__block-item letstalk-mbox-photo--download"
              >
                <FaCloudDownload />
              </button>
            }
            {
              typeof props.data.status.loading === 'number' &&
                  props.data.status.loading !== 0 &&
                  <div />
            }
          </div>
      }
    </div>
    {
      props.text &&
      <div className="letstalk-mbox-text">
        {props.text}
      </div>
    }
  </div>
);

PhotoMessage.defaultProps = {
  text: '',
  data: {},
  onDownload: null,
  onOpen: null,
};

PhotoMessage.propTypes = {
  text: PropTypes.string,
  data: PropTypes.object,
  onDownload: PropTypes.func,
  onOpen: PropTypes.func,
};

export default PhotoMessage;
