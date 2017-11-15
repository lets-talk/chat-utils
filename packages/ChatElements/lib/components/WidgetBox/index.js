import React from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header';
import MessageList from './components/MessageList';
import Sender from './components/Sender';
import './index.scss';

const WidgetBox = (props) => {
  return (
    <div className="widgetbox-container">
      <Header
        title={props.title}
        subtitle={props.subtitle}
        avatar={props.avatar}
        toggleChat={props.toggleChat}
        openMenu={props.openMenu}
        showMinimizeButton={props.showMinimizeButton}
        showMenuButton={props.showMenuButton}
      />
      <MessageList
        messages={props.messages}
      />
      <Sender
        sendMessage={props.sendMessage}
        placeholder={props.senderPlaceHolder}
        disabledInput={props.disabledInput}
      />
    </div>
  );
};

WidgetBox.propTypes = {
  messages: PropTypes.array,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  sendMessage: PropTypes.func,
  senderPlaceHolder: PropTypes.string,
  toggleChat: PropTypes.func,
  openMenu: PropTypes.func,
  showMinimizeButton: PropTypes.bool,
  showMenuButton: PropTypes.bool,
  disabledInput: PropTypes.bool,
};

export default WidgetBox;
