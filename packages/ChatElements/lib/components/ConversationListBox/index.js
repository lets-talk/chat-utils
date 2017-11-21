import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Header from '../Header';
import ConversationList from '../ConversationList/Loadable';
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
    newConversationHandler,
    clickConversationHandler,
    openMenu,
    showMinimizeButton,
    showMenuButton,
    noMoreDataText,
    emptyStateText,
  } = props;

  return (
    <div className={classNames('conversation-listbox-container', className)}>
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
        clickItem={clickConversationHandler}
        noMoreDataText={noMoreDataText}
        emptyStateText={emptyStateText}
        toBottomHeight={props.toBottomHeight}
      />
      <Button
        type="submit"
        clickHandler={newConversationHandler}
        value="Nueva conversación"
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
  clickConversationHandler: PropTypes.func,
  newConversationHandler: PropTypes.func,
  showMinimizeButton: PropTypes.bool,
  showMenuButton: PropTypes.bool,
  noMoreDataText: PropTypes.bool,
  emptyStateText: PropTypes.bool,
};

ConversationListBox.defaultProps = {
  title: '',
  subtitle: '',
  avatar: '',
  toggleChat: null,
  openMenu: null,
  clickConversationHandler: null,
  newConversationHandler: null,
  showMinimizeButton: false,
  showMenuButton: false,
};

export default ConversationListBox;
