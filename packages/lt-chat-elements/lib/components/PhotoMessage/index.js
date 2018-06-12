import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FaCloudDownload from 'react-icons/lib/fa/cloud-download';

const StyledPhotoContainer = styled.div`
  margin-top: -3px;
  margin-right: -6px;
  margin-left: -6px;

  div {
    position: relative;
    display: flex;
    overflow: hidden;
    justify-content: center;
    border-radius: 5px;
    max-height: 300px;
  }
`;

StyledPhotoContainer.displayName = 'PhotoContainer';

const StyledDownloadButton = styled.button`
  color: #efe;
  display: flex;
  justify-content: center;
  background: none;
  border: none;
  font-size: 3.2em;
  outline: none;
  border: 1px solid #eee;
  border-radius: 100%;
  height: 100px;
  width: 100px;
`;

StyledDownloadButton.displayName = 'DownloadButton';

const StyledDownloadActionsContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  border-radius: 5px;
  display: flex;
`;

const StyledText = styled.div`
  padding: 5px 0px;
  max-width: 300px;
  margin: auto;
`;

const PhotoMessage = (props) => {
  const StyledImageContainer = styled.div`
    position: relative;
    display: flex;
    overflow: hidden;
    justify-content: center;
    border-radius: 5px;
    max-height: 300px;
    width: ${props.data.width};
    width: ${props.data.height};

    img {
      height: 100%;
      min-height: 100px;
      user-select: none;
    }
  `;
  StyledImageContainer.displayName = 'ImageContainer';

  return (
    <StyledPhotoContainer>
      <StyledImageContainer
        onClick={props.onOpen}
        onKeyPress={props.onOpen}
      >
        <img
          src={props.data.uri}
          alt={props.data.alt}
        />
        {
          props.data.status &&
            !props.data.status.download &&
            <StyledDownloadActionsContainer>
              {
                !props.data.status.click &&
                  <StyledDownloadButton
                    onClick={props.onDownload}
                  >
                    <FaCloudDownload />
                  </StyledDownloadButton>
              }
              {
                typeof props.data.status.loading === 'number' &&
                    props.data.status.loading !== 0 &&
                    <div>{props.data.status.loading}</div>
              }
            </StyledDownloadActionsContainer>
        }
      </StyledImageContainer>
      {
        props.text &&
        <StyledText>
          {props.text}
        </StyledText>
      }
    </StyledPhotoContainer>
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

PhotoMessage.displayName = 'PhotoMessage';

export default PhotoMessage;
