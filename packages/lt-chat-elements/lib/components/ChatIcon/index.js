import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MdChat from 'react-icons/lib/md/chat';

import { ellipsis, themeColor, textColor } from '../../utils/style';

const SimpleButton = styled.button`
  color: ${(props) => textColor(props.theme, 'dark', 'primary')};
  font-size: ${(props) => props.theme.typography.classes.footnote.fontSize};
  font-weight: ${(props) => props.theme.typography.weights.fontWeightBold};
  line-height: ${(props) => props.theme.typography.classes.footnote.lineHeight};
  background-color: ${(props) => themeColor(props.theme, 'accent', 'base')};
`;

const ChatIcon = (props) => {
  const {
    imageUrl,
  } = props;

  const {
    chatIconRadius = '0px',
    onClick,
  } = props;

  const useImage = !!imageUrl;

  const msgLbl = props.newMessages > 20 ? '20+' : props.newMessages;

  const StyledBubbleDiv = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    background-color: ${(innerProps) => themeColor(innerProps.theme, 'primary', 'dark')};
    color: white;
    border-radius: 50%;
    padding: 1px;
    min-width: 24px;
    text-align: center;
    font-size: 12px;
    font-family: sans-serif;
    line-height: 24px;
    font-weight: 600;
  `;
  StyledBubbleDiv.displayName = 'StyledBubbleDiv';

  const messagesBubble = (
    <StyledBubbleDiv>{ msgLbl }</StyledBubbleDiv>
  );

  const StyledButton = SimpleButton.extend`
    width: ${props.width}px;
    height: ${props.height}px;
    margin: ${props.margin};
    border-radius: calc(${props.height}px / 2);
    line-height: calc(${props.height}px / 2);

    border-radius: ${() =>
    (props.type && props.type === 'rounded' && '5px 5px 0 0')
    || (props.type && props.type === 'circle' && '50%')
    || '0'};

    &:active {
      border-style: none;
    }

    &:focus {
      outline: none;
    }

    span {
      width: calc(100% - ${props.height}px);
      font-size: $chatIcon-font-size;
      float: left;
      text-align: left;
      ${ellipsis('100%')}
    }
`;
  StyledButton.displayName = 'StyledButton';

  const StyledImageIconContainer = styled.div`
    width: ${props.width}px;
    height: ${props.height}px;
    margin: ${props.margin};

    background-color: 'transparent';
    position: relative;
    margin-bottom: 50px;
    float: right;
    margin-right: 10px;
    borderRadius: ${chatIconRadius};
    cursor: pointer;
    boxShadow: 0px 25px 13px -22px rgba(0,0,0,0.44);

    img {
      width: 100%;
      height: 100%;
      border-radius: calc(${props.height}px / 2);
      line-height: calc(${props.height}px / 2);

      border-radius: ${() =>
    (props.type && props.type === 'rounded' && '5px 5px 0 0')
      || (props.type && props.type === 'circle' && '50%')
      || '0'};
    }
  `;
  StyledImageIconContainer.displayName = 'StyledImageIconContainer';

  const defaultIcon = (
    <div className="letstalk-ChatIconContainer">
      <StyledButton
        width={props.width}
        height={props.height}
        margin={props.margin}
        type={props.type}
      >
        <span>{props.text}</span>
        {props.showIcon && <MdChat size={props.height / 2.5} color="white" />}
      </StyledButton>
      { props.newMessages > 0 && messagesBubble }
    </div>
  );

  const imageIcon = (
    <StyledImageIconContainer>
      <img
        alt="Launch chat"
        src={imageUrl}
      />
      { props.newMessages > 0 && messagesBubble }
    </StyledImageIconContainer>
  );

  return (
    <div
      tabIndex="0"
      role="button"
      onKeyUp={onClick}
      onClick={onClick}
    >
      { useImage && imageIcon }
      { !useImage && defaultIcon }
    </div>
  );
};


ChatIcon.propTypes = {
  /**
   * types: default, rounded, circle
   */
  type: PropTypes.string,
  /**
   * text: Text to show on the component
   */
  text: PropTypes.string,
  /**
   * showIcon: Wheter or not display the chat icon
   */
  showIcon: PropTypes.bool,
  /**
   * width: Set the width of the button
   */
  width: PropTypes.number,
  /**
   * height: Set the height of the button
   */
  height: PropTypes.number,
  /**
   * margin: Set the margin of the button
   */
  margin: PropTypes.string,
  /**
   * onCLick: Hanlder function when click Event happens
   */
  onClick: PropTypes.func,
  /**
  * imageUrl: Image source of the image to show as chatIcon
  */
  imageUrl: PropTypes.string,
  /**
  * chatIconRadius: The border radius of the chat icon
  */
  chatIconRadius: PropTypes.string,
  /**
  * newMessages: Number of new messages to show
  */
  newMessages: PropTypes.number,
};

ChatIcon.defaultProps = {
  type: 'rounded',
  text: '',
  showIcon: true,
  onClick: null,
  height: 50,
  width: 250,
  margin: '',
  imageUrl: '',
};

export default ChatIcon;
