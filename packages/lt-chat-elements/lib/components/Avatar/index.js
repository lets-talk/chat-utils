import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import { avatarStyle, textColor } from '../../utils/style';

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

const StyledAvatarContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0,
  margin: 0 auto;
  overflow: hidden;
`;

const StyledImageContainer = styled.div`
  ${(props) => avatarStyle('container', props.size)}
  position: relative;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  background-color: rgb(188, 188, 188);
  ${(props) => avatarStyle('image', props.size)}
  border-radius: ${(props) =>
    (props.type === 'rounded' && '5px')
    || (props.type === 'circle' && '50%')
    || '0'};
  vertical-align: middle;
`;

const StyledText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  width: 100%;
  height: 100%;
  text-align: center;

  ${(props) => avatarStyle('letter', props.size)}
  
  color: ${(props) => textColor(props.theme, 'dark', 'primary')};
  background-color: ${(props) =>
    (props.color && props.color)
    || 'rgb(188, 188, 188)'};

  ${(props) => avatarStyle('image', props.size)}
  border-radius: ${(props) =>
    (props.type === 'rounded' && '5px')
    || (props.type === 'circle' && '50%')
    || '0'};
`;

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


const Avatar = (props) => {
  const {
    children: childrenProp,
    src,
    srcSet,
  } = props;

  let children = null;

  if (childrenProp) {
    if (
      typeof childrenProp !== 'string' &&
      React.isValidElement(childrenProp)
    ) {
      children = React.cloneElement(childrenProp);
    } else {
      children = childrenProp;
    }

    children = (
      <StyledText
        color={props.color}
        type={props.type}
        size={props.size}
      >
        {children}
        {props.withStatus && <AvatarStatus size={props.size} status={props.status}>&nbsp;</AvatarStatus>}
      </StyledText>
    );
  } else if (src || srcSet) {
    children = (
      <StyledImageContainer>
        <StyledImage
          src={props.src}
          size={props.size}
          srcSet={srcSet}
          sizes={props.sizes}
          alt={props.alt}
          type={props.type}
        />
        <ImageInnerDiv ></ImageInnerDiv>
        {props.withStatus && <AvatarStatus size={props.size} status={props.status}>&nbsp;</AvatarStatus>}
      </StyledImageContainer>
    );
  }

  return (
    <StyledAvatarContainer size={props.size} className={props.className}>
      {children}
    </StyledAvatarContainer>
  );
};


Avatar.propTypes = {
  /**
   * types: default, circle, rounded(border radius 5px), flexible
   */
  type: PropTypes.string,
  /**
   * The `src` attribute for the `img` element.
   */
  src: PropTypes.string,
  /**
   * image size. default (25px), xsmall(30px), small(35px), medium(40px), large(45px), xlarge (55px)
   */
  size: PropTypes.string,
  /**
   * The `sizes` attribute for the `img` element.
   */
  sizes: PropTypes.string,
  /**
   * The `srcSet` attribute for the `img` element.
   */
  srcSet: PropTypes.string,
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
  /**
   * Hexadecimal color used for Text Avatar Background
   */
  color: (myprops, propName, componentName) => {
    if (!myprops[propName]) {
      // When no color specified default is false, let it pass validation
      return null;
    }
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(myprops[propName])) {
      return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`);
    }
    return null;
  },
  /**
   * Children is a react component to render inside the Avatar (For letters Avatar for example)
   */
  children: PropTypes.node,
};

Avatar.defaultProps = {
  type: 'circle',
  size: 'medium',
  color: null,
  sizes: null,
  withStatus: false,
  status: '',
  className: 'LT-Avatar-Container',
  src: null,
  srcSet: null,
  alt: '',
};

export default Avatar;
