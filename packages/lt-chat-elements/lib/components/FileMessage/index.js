import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FaCloudDownload from 'react-icons/lib/fa/cloud-download';
import FaFile from 'react-icons/lib/fa/file';

import { themeColor } from '../../utils/style';

const StyledFileMessageContainer = styled.div`
  display: inline-block;
  margin-bottom: 10px;
  max-width: calc(100% - 10px);
`;
StyledFileMessageContainer.displayName = 'StyledFileMessageContainer';

const StyledFileMessageBody = styled.div`
  background: #e9e9e9;
  display: flex;
  border-radius: 5px;
  margin-top: -3px;
  margin-right: -6px;
  margin-left: -6px;
  margin-bottom: 10px;
  align-items: center;
  min-height: 52px;
  padding: 5px;
  outline: none;
  border:none;
`;
StyledFileMessageBody.displayName = 'StyledFileMessageBody';

const StyledFileIcon = styled.div`
  font-size: 30px;
  align-items: center;
  display: flex;
  padding: 0 10px;
  color: ${(props) => themeColor(props.theme, 'accent', 'base')};

  div {
    font-size: 10px;
    margin-top: 3px;
    max-width: 52px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
StyledFileIcon.displayName = 'StyledFileIcon';

const StyledFileName = styled.div`
  font-size: 13.6px;
  min-width: 100px;
  max-width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
StyledFileName.displayName = 'StyledFileName';

const StyledFileDownloadButton = styled.div`
  color: ${(props) => themeColor(props.theme, 'primary', 'base')};
  padding: 0 10px;
  font-size: 30px;
  align-items: center;
  display: flex;
  cursor: pointer;
  user-select: none;
`;
StyledFileDownloadButton.displayName = 'StyledFileDownloadButton';

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
      <StyledFileMessageContainer className={this.props.className}>
        <StyledFileMessageBody>
          <StyledFileIcon>
            <FaFile />
          </StyledFileIcon>
          <StyledFileName>
            {this.props.text}
          </StyledFileName>
          <StyledFileDownloadButton onClick={this.onClick}>
            {
              this.props.data.status &&
              <FaCloudDownload />
            }
          </StyledFileDownloadButton>
          {
            this.props.data.status &&
                typeof this.props.data.status.loading === 'number' &&
                this.props.data.status.loading !== 0 &&
                <div />
          }
        </StyledFileMessageBody>
      </StyledFileMessageContainer>
    );
  }
}

FileMessage.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  data: PropTypes.object,
  onDownload: PropTypes.func,
  onOpen: PropTypes.func,
};

FileMessage.defaultProps = {
  className: 'LT-FileMessage-Container',
  text: '',
  data: {},
  onDownload: null,
  onOpen: null,
};

FileMessage.displayName = 'FileMessage';

export default FileMessage;
