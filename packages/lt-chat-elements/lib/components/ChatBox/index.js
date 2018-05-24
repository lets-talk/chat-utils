import React from 'react';
import PropTypes from 'prop-types';

import WidgetBox from '../WidgetBox';
import MessageList from '../MessageList';
import Sender from '../Sender';

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
    onOpen,
    onDownload,
    onTitleClick,
    onForwardClick,
    openMenu,
    showMinimizeButton,
    showMenuButton,
    sendMessage,
  } = props;

  return (
    <WidgetBox>
      <WidgetBox.Header
        title={title}
        subtitle={subtitle}
        className={className}
        toggleChat={toggleChat}
        openMenu={openMenu}
        showMinimizeButton={showMinimizeButton}
        showMenuButton={showMenuButton}
        person={person}
      />
      <WidgetBox.Body>
        <MessageList
          messages={messages}
          onActionMessageClick={onActionMessageClick}
          onOpen={onOpen}
          onDownload={onDownload}
          onTitleClick={onTitleClick}
          onForwardClick={onForwardClick}
        />
      </WidgetBox.Body>
      <WidgetBox.Footer>
        <Sender
          sendMessage={sendMessage}
          placeholder={senderPlaceHolder}
          disabledInput={disabledInput}
        />
      </WidgetBox.Footer>
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
  onOpen: PropTypes.func,
  onDownload: PropTypes.func,
  onTitleClick: PropTypes.func,
  onForwardClick: PropTypes.func,
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
