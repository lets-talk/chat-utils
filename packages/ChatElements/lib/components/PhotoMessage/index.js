import React from 'react';

import './index.css';

import FaCloudDownload from 'react-icons/lib/fa/cloud-download';

import CircularProgress from 'material-ui/CircularProgress';

const PhotoMessage = (props) => {
  const progressOptions = {
    strokeWidth: 2.3,
    color: '#efe',
    trailColor: '#aaa',
    trailWidth: 1,
    step: (state, circle) => {
      circle.path.setAttribute('trail', state.color);
      circle.path.setAttribute('trailwidth-width', state.width);

      const value = Math.round(circle.value() * 100);
      if (value === 0) { circle.setText(''); } else { circle.setText(value); }
    },
  };

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


export default PhotoMessage;
