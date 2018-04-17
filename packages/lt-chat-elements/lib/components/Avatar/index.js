import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import { avatarStyle } from '../../utils/style';

const singleBallBeat = keyframes`{
  0% {
    transform: scale(1);
    opacity: 0.8;
  }

  50% {
    transform: scale(1.5);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}`;

const AvatarContainer = styled.div`
  ${(props) => avatarStyle('container', props.size)}
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  background-color: rgb(188, 188, 188);
  ${(props) => avatarStyle('image', props.size)}
  border-radius: ${(props) =>
    (props.type === 'rounded' && '5px')
    || (props.type === 'circle' && '50%')
    || '0'
};`;

const ImageInnerDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const AvatarStatus = styled.div`
  position: absolute;
  right: 0px;
  border-radius: 100%;
  padding: 1px;
  font-weight: 600;
  border: 2px solid #FFFFFF;
  ${(props) => avatarStyle('status', props.size)}
  ${(props) =>
    props.status && props.status === 'live' &&
      css`
        animation: ${singleBallBeat} 3s infinite;
      `};
  background-color: ${(props) => {
    if (props.status === 'live') return props.theme.palette.common.online;
    if (props.status === 'online') return props.theme.palette.common.online;
    if (props.status === 'offline') return props.theme.palette.common.offline;
    if (props.status === 'sleeping') return props.theme.palette.common.sleeping;
    return props.theme.palette.common.sleeping;
  }}
`;


const Avatar = (props) =>
  (
    <AvatarContainer size={props.size} className={props.className}>
      <ImageContainer>
        <Image alt={props.alt} src={props.src} size={props.size} type={props.type} />
        <ImageInnerDiv ></ImageInnerDiv>
      </ImageContainer>

      {props.withStatus && <AvatarStatus size={props.size} status={props.status}>&nbsp;</AvatarStatus>}
    </AvatarContainer>
  );

Avatar.defaultProps = {
  type: 'circle',
  size: 'medium',
  withStatus: false,
  status: '',
  className: 'LT-Avatar-Container',
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
  alt: PropTypes.string,
};

export default Avatar;
