import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FaCloudDownload from 'react-icons/lib/fa/cloud-download';
import FaFile from 'react-icons/lib/fa/file';
import CircularProgress from 'material-ui/CircularProgress';

import './index.css';

export class FileMessage extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (!this.props.data.status) { return; }

    if (!this.props.data.status.download && this.props.onDownload instanceof Function) {
      this.props.onDownload();
    } else if (this.props.data.status.download && this.props.onOpen instanceof Function) {
      this.props.onOpen();
    }
  }

  render() {
    return (
      <div className="letstalk-mbox-file">
        <button onClick={this.onClick}>
          <div className="letstalk-mbox-file--icon">
            <FaFile
              color="#aaa"
            />
            <div className="letstalk-mbox-file--size">
              {this.props.data.size}
            </div>
          </div>
          <div className="letstalk-mbox-file--text">
            {this.props.text}
          </div>
          <div className="letstalk-mbox-file--buttons">
            {
              this.props.data.status &&
                !this.props.data.status.download &&
                !this.props.data.status.click &&
                <FaCloudDownload
                  color="#aaa"
                />
            }
            {
              this.props.data.status &&
                typeof this.props.data.status.loading === 'number' &&
                this.props.data.status.loading !== 0 &&
                <CircularProgress
                  mode="determinate"
                  value={this.props.data.status.loading}
                  size={80}
                  thickness={5}
                />
            }
          </div>
        </button>
      </div>
    );
  }
}

FileMessage.propTypes = {
  text: PropTypes.string,
  data: PropTypes.object,
  onClick: PropTypes.func,
  onDownload: PropTypes.func,
  onOpen: PropTypes.func,
};

FileMessage.defaultProps = {
  text: '',
  data: {},
  onClick: null,
  onDownload: null,
  onOpen: null,
};


export default FileMessage;
