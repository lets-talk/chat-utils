import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FaCloudDownload from 'react-icons/lib/fa/cloud-download';
import FaFile from 'react-icons/lib/fa/file';

const StyledMessageBox = styled.div`
  padding-bottom: 13px;

  button {
      background: #e9e9e9;
      display: flex;
      border-radius: 5px;
      margin-top: -3px;
      margin-right: -6px;
      margin-left: -6px;
      align-items: center;
      min-height: 52px;
      max-width: 500px;
      padding: 5px 0;
      cursor: pointer;
      user-select: none;
      outline: none;
      border:none;
  }
`;

const StyledFileIcon = styled.div`
  font-size: 30px;
  align-items: center;
  display: flex;

  div {
    font-size: 10px;
    margin-top: 3px;
    max-width: 52px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StyledFileName = styled.div`
  font-size: 13.6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledFileDownloadButtons = styled.div`
  font-size: 30px;
  align-items: center;
  display: flex;
`;

export class FileMessage extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (!this.props.data.status) { return; }
    if (!this.props.data.status.download && this.props.onDownload) {
      this.props.onDownload();
    } else if (this.props.data.status.download && this.props.onOpen) {
      this.props.onOpen();
    }
  }

  render() {
    return (
      <StyledMessageBox>
        <button onClick={this.onClick}>
          <StyledFileIcon>
            <FaFile
              color="#aaa"
            />
            <div>
              {this.props.data.size}
            </div>
          </StyledFileIcon>
          <StyledFileName>
            {this.props.text}
          </StyledFileName>
          <StyledFileDownloadButtons>
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
                <div />
            }
          </StyledFileDownloadButtons>
        </button>
      </StyledMessageBox>
    );
  }
}

FileMessage.propTypes = {
  text: PropTypes.string,
  data: PropTypes.object,
  onDownload: PropTypes.func,
  onOpen: PropTypes.func,
};

FileMessage.defaultProps = {
  text: '',
  data: {},
  onDownload: null,
  onOpen: null,
};


// <CircularProgress
//   mode="determinate"
//   value={this.props.data.status.loading}
//   size={80}
//   thickness={5}
// />

export default FileMessage;
