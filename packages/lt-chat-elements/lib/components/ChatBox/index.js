import React from 'react';
import PropTypes from 'prop-types';

import WidgetBox from '../WidgetBox';
import MessageBox from '../MessageBox';
import ScrollableList from '../ScrollableList';
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
        <ScrollableList>
          {messages.map((message) => (<MessageBox message={message} />))}
        </ScrollableList>
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

ChatBox.displayName = 'ChatBox';

export default ChatBox;
