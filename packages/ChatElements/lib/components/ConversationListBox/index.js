import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Header from '../Header';
import ConversationList from '../ConversationList';
import Button from '../Button';
import './index.scss';

const ConversationListBox = (props) => {
  const {
    conversations,
    title,
    subtitle,
    avatar,
    className,
    toggleChat,
    openMenu,
    showMinimizeButton,
    showMenuButton,
  } = props;

  return (
    <div className={classNames('widgetbox-container', className)}>
      <Header
        title={title}
        subtitle={subtitle}
        avatar={avatar}
        toggleChat={toggleChat}
        openMenu={openMenu}
        showMinimizeButton={showMinimizeButton}
        showMenuButton={showMenuButton}
      />
      <ConversationList
        conversations={conversations}
      />
      <Button
        value="Nueva Conversacion"
      />
    </div>
  );
};

ConversationListBox.propTypes = {
  conversations: PropTypes.array.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  avatar: PropTypes.string,
  className: PropTypes.string,
  toggleChat: PropTypes.func,
  openMenu: PropTypes.func,
  showMinimizeButton: PropTypes.bool,
  showMenuButton: PropTypes.bool,
};

ConversationListBox.defaultProps = {
  showMinimizeButton: false,
  showMenuButton: false,
};

export default ConversationListBox;
