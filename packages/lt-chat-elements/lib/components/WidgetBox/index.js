import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Header from '../Header';
import MessageList from '../MessageList/Loadable';
import Sender from '../Sender';
import './index.scss';

const WidgetBox = (props) => {
  const {
    messages,
    title,
    subtitle,
    person,
    senderPlaceHolder,
    className,
    toggleChat,
    onActionMessageClick,
    disabledInput,
    openMenu,
    showMinimizeButton,
    showMenuButton,
    sendMessage,
  } = props;

  return (
    <div className={classNames('widgetbox-container', className)}>
      <Header
        title={title}
        subtitle={subtitle}
        person={person}
        toggleChat={toggleChat}
        openMenu={openMenu}
        showMinimizeButton={showMinimizeButton}
        showMenuButton={showMenuButton}
      />
      <MessageList
        messages={messages}
        onActionMessageClick={onActionMessageClick}
      />
      <Sender
        sendMessage={sendMessage}
        placeholder={senderPlaceHolder}
        disabledInput={disabledInput}
      />
    </div>
  );
};

WidgetBox.propTypes = {
  messages: PropTypes.array,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  person: PropTypes.object,
  className: PropTypes.string,
  sendMessage: PropTypes.func,
  senderPlaceHolder: PropTypes.string,
  toggleChat: PropTypes.func,
  openMenu: PropTypes.func,
  onActionMessageClick: PropTypes.func,
  showMinimizeButton: PropTypes.bool,
  showMenuButton: PropTypes.bool,
  disabledInput: PropTypes.bool,
};

WidgetBox.defaultProps = {
  messages: [],
  title: '',
  subtitle: '',
  person: {},
  className: 'LT-WidgetBox-Container',
};

export default WidgetBox;
