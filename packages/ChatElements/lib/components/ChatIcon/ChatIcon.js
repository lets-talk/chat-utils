import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import IconButton from 'material-ui/IconButton';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import styles from './ChatIcon.css';

// Stylesheets
import styled from 'styled-components';

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

  const messagesBubble = (
    <div
      style={props.bubbleMessageStyle}
    >{ msgLbl }
    </div>
  );

  const Button = styled.button`
    position: relative;
    margin-bottom: 50px;
    height: 50px;
    width: 50px;
    float: right;
    margin-right: 10px;
    color: ${(cprops) => cprops.theme.palette.primary1Color};
    background-color: ${(cprops) => cprops.theme.palette.primary1Color};
    border-radius: 50%;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16), 0 3px 10px rgba(0, 0, 0, 0.23);

    &:active {
      border-style: none;
    }

    &:focus {
      outline: none;
    }
`;

  const defaultIcon = (
    <div className={styles.ChatIconContainer}>
      <Button
        onTouchTap={(a) => a}
      >
        <i className="md-icon-chat" style={{ backgroundColor: 'transparent' }}></i>
      </Button>
      { props.newMessages > 0 && messagesBubble }
    </div>
  );

  const defaultIcon2 = (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div>
        <IconButton
          className="chat-icon"
          style={{
            position: 'relative',
            marginBottom: '50px',
            height: '50px',
            float: 'right',
            marginRight: '10px',
            backgroundColor: props.theme.palette.primary1Color,
            borderRadius: '50%',
            boxShadow: '0px 20px 13px -15px rgba(0,0,0,0.44)',
          }}
        >
          <i className="md-icon-chat" style={{ backgroundColor: 'transparent' }}></i>
        </IconButton>
        { props.newMessages > 0 && messagesBubble }
      </div>
    </MuiThemeProvider>
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
