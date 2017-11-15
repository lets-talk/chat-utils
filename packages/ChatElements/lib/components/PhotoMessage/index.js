import React from 'react';
import PropTypes from 'prop-types';

import FaCloudDownload from 'react-icons/lib/fa/cloud-download';
import CircularProgress from 'material-ui/CircularProgress';

import './index.scss';

const PhotoMessage = (props) => {
  return (
    <div className="letstalk-mbox-photo">
      <div
        className="letstalk-mbox-photo--img"
        style={props.data.width && props.data.height && {
          width: props.data.width,
          height: props.data.height,
        }}
      >
        <img
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
                    <CircularProgress
                      mode="determinate"
                      value={props.data.status.loading}
                      size={80}
                      thickness={5}
                      style={{
                        width: '100px',
                        height: '100px',
                      }}
                      innerStyle={{
                        margin: 'auto',
                        cursor: 'pointer',
                      }}
                    />
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
};

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
