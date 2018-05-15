import React from 'react';
import PropTypes from 'prop-types';

import WidgetBox from '../WidgetBox';
import MessageList from '../MessageList';
import Sender from '../Sender';
import Header from '../Header';


const FooterComponent = (props) => {
  const { sendMessage, senderPlaceHolder, disabledInput } = props;
  return (<Sender
    sendMessage={sendMessage}
    placeholder={senderPlaceHolder}
    disabledInput={disabledInput}
  />);
};

FooterComponent.propTypes = {
  sendMessage: PropTypes.func,
  senderPlaceHolder: PropTypes.string,
  disabledInput: PropTypes.bool,
};

const HeaderComponent = (props) => {
  const {
    title,
    subtitle,
    person,
    toggleChat,
    openMenu,
    showMinimizeButton,
    showMenuButton,
  } = props;
  return (
    <Header
      title={title}
      subtitle={subtitle}
      person={person}
      toggleChat={toggleChat}
      openMenu={openMenu}
      showMinimizeButton={showMinimizeButton}
      showMenuButton={showMenuButton}
    />);
};


HeaderComponent.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  person: PropTypes.object,
  toggleChat: PropTypes.func,
  openMenu: PropTypes.func,
  showMinimizeButton: PropTypes.bool,
  showMenuButton: PropTypes.bool,
};


const ChatBox = (props) => {
  const {
    messages,
    title,
    subtitle,
    person,
    senderPlaceHolder,
    className,
    toggleChat,
    disabledInput,
    onActionMessageClick,
    openMenu,
    showMinimizeButton,
    showMenuButton,
    sendMessage,
  } = props;

  return (
    <WidgetBox
      title={title}
      subtitle={subtitle}
      person={person}
      senderPlaceHolder={senderPlaceHolder}
      className={className}
      toggleChat={toggleChat}
      disabledInput={disabledInput}
      openMenu={openMenu}
      showMinimizeButton={showMinimizeButton}
      showMenuButton={showMenuButton}
      sendMessage={sendMessage}
      footer={FooterComponent}
      header={HeaderComponent}
    >
      <MessageList
        messages={messages}
        onActionMessageClick={onActionMessageClick}
      />
    </WidgetBox>
  );
};

ChatBox.propTypes = {
  messages: PropTypes.array,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  person: PropTypes.object,
  className: PropTypes.string,
  sendMessage: PropTypes.func,
  onActionMessageClick: PropTypes.func,
  senderPlaceHolder: PropTypes.string,
  toggleChat: PropTypes.func,
  openMenu: PropTypes.func,
  showMinimizeButton: PropTypes.bool,
  showMenuButton: PropTypes.bool,
  disabledInput: PropTypes.bool,
};

ChatBox.defaultProps = {
  title: '',
  subtitle: '',
  person: {},
  className: 'LT-ChatBox-Container',
};

export default ChatBox;
