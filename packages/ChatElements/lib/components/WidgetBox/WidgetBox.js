import React from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header';
import MessageList from './components/MessageList';
import Sender from './components/Sender';
import './WidgetBox.scss';

const WidgetBox = (props) =>
  (
    <div className="widgetbox-container">
      <Header
        title={props.title}
        subtitle={props.subtitle}
        toggleChat={props.toggleChat}
        showCloseButton={props.showCloseButton}
      />
      <MessageList
        messages={props.messages}
        profileAvatar={props.profileAvatar}
      />
      <Sender
        sendMessage={props.sendMessage}
        placeholder={props.senderPlaceHolder}
        disabledInput={props.disabledInput}
      />
    </div>
  );

WidgetBox.propTypes = {
  messages: PropTypes.array,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  sendMessage: PropTypes.func,
  senderPlaceHolder: PropTypes.string,
  profileAvatar: PropTypes.string,
  toggleChat: PropTypes.func,
  showCloseButton: PropTypes.bool,
  disabledInput: PropTypes.bool,
};

export default WidgetBox;
