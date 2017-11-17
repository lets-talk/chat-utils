import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';
import MdChat from 'react-icons/lib/md/chat';
// Stylesheet
import './index.scss';

const ChatIcon = (props) => {
  // Show the toggle icon only when widget is hidden or minimized and
  // animation is finished.
  let toggleIconDisplay = 'block';
  let toggleIconVisibility = 'hidden';

  if (props.display === 'minimized' || props.display === 'hidden') {
    toggleIconDisplay = 'block';
  }

  if (props.display === 'minimized' && props.animationStatus) {
    toggleIconVisibility = 'visible';
  }

  if (props.display === 'hidden') {
    toggleIconVisibility = 'visible';
  }

  if (props.display === 'small') {
    toggleIconDisplay = 'none';
  }

  const {
    imageUrl,
  } = props.chat_icon_pic;

  const {
    chatIconRadius = '0px',
  } = props;

  const useImage = !!imageUrl;

  const msgLbl = props.newMessages > 20 ? '20+' : props.newMessages;

  const StyledBubbleDiv = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    background-color: #f33535;
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

  const messagesBubble = (
    <StyledBubbleDiv>{ msgLbl }</StyledBubbleDiv>
  );

  const Button = styled.button`
    color: ${(props) => props.theme.palette.primary1Color};
    background-color: ${(props) => props.theme.palette.primary1Color};
    width: ${props.width}px;
    height: ${props.height}px;
    margin: ${props.margin};
    border-radius: calc(${props.height}px / 2);
    line-height: calc(${props.height}px / 2);

    &:active {
      border-style: none;
    }

    &:focus {
      outline: none;
    }
`;

  const StyledSpan = styled.span`
    width: calc(100% - ${props.height}px);
  `;

  const defaultIcon = (
    <div className="letstalk-ChatIconContainer">
      <Button
        className={classnames('letstalk-ChatIcon', props.type)}
        onTouchTap={(a) => a}
      >
        <StyledSpan className="intro-message">{props.text}</StyledSpan>
        {props.showIcon && <MdChat size={props.height / 2.5} color="white" />}
      </Button>
      { props.newMessages > 0 && messagesBubble }
    </div>
  );

  const imageIcon = (
    <div
      className="chat-icon"
      style={{
        backgroundColor: 'transparent',
        height: '50px',
        width: 'auto',
        position: 'relative',
        marginBottom: '50px',
        float: 'right',
        marginRight: '10px',
        display: toggleIconDisplay,
        visibility: toggleIconVisibility,
        borderRadius: chatIconRadius,
        cursor: 'pointer',
        boxShadow: '0px 25px 13px -22px rgba(0,0,0,0.44)',
      }}
      iconStyle={{
        borderRadius: chatIconRadius, backgroundColor: 'transparent', height: '50px', width: 'auto',
      }}
      onTouchTap={(a) => a}
    >
      <img
        alt="Launch chat"
        src={imageUrl}
        style={{
          borderRadius: chatIconRadius, backgroundColor: 'transparent', height: '50px', width: 'auto',
        }}
      />
      { props.newMessages > 0 && messagesBubble }
    </div>
  );

  return (
    <div>
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
   * Description of prop "theme".
   */
  theme: PropTypes.shape({
    palette: PropTypes.shape({
      primary1Color: PropTypes.string,
      primary2Color: PropTypes.string,
      counterText: PropTypes.string,
    }),
  }),
  bubbleMessageStyle: PropTypes.object,
  chat_icon_pic: PropTypes.string,
  chatIconRadius: PropTypes.string,
  display: PropTypes.string,
  animationStatus: PropTypes.bool,
  newMessages: PropTypes.number,
};

ChatIcon.defaultProps = {
  type: 'rounded',
  text: '',
  showIcon: true,
  height: 50,
  width: 250,
  margin: '',
  theme: {
    palette: {
      primary1Color: '#f33535',
      cntColor: 'white',
      counterText: '',
    },
  },
  bubbleMessageStyle: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    backgroundColor: '#f33535',
    color: 'white',
    borderRadius: '20px',
    padding: '1px',
    minWidth: '24px',
    textAlign: 'center',
    fontSize: '12px',
    fontFamily: 'sans-serif',
    lineHeight: '24px',
    fontWeight: '600',
  },
  chat_icon_pic: '',
  display: 'minimized',
};

export default ChatIcon;
