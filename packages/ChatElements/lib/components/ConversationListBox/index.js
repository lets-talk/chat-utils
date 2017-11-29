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
    avatarStatus,
    className,
    toggleChat,
    newConversationHandler,
    clickConversationHandler,
    openMenu,
    showMinimizeButton,
    showMenuButton,
    showAddConversationButton,
    noMoreDataText,
    emptyStateText,
    newConversationText,
  } = props;

  return (
    <div className={classNames('conversation-listbox-container', className)}>
      <Header
        title={title}
        subtitle={subtitle}
        avatar={avatar}
        avatarStatus={avatarStatus}
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
      />
      {showAddConversationButton &&
        <Button
          type="submit"
          clickHandler={newConversationHandler}
          value={newConversationText}
        />
      }
    </div>
  );
};

ConversationListBox.propTypes = {
  /**
   * conversations: Conversation list to be displayed
   */
  conversations: PropTypes.array.isRequired,
  /**
   * title: Title to show on the header
   */
  title: PropTypes.string,
  /**
   * subtitle: Title to show on the header
   */
  subtitle: PropTypes.string,
  /**
   * avatar: Avatar image to display on the header of the component
   */
  avatar: PropTypes.string,
  /**
   * avatar: Avatar status to display bewlow the avatar. If empty none is displayed
   */
  avatarStatus: PropTypes.string,
  /**
   * toggleChat: Callback function called when user clicks on the toggle button
   */
  toggleChat: PropTypes.func,
  /**
   * openMenu: Callback function called when user clicks on open menu button
   */
  openMenu: PropTypes.func,
  /**
   * clickConversationHandler: Callback function called when user clicks on a conversation item
   * This callback recieves the conversation object, the index, and the pure dom event
   * So it should be of the form callback = (conversation, index, e) =>
   */
  clickConversationHandler: PropTypes.func,
  /**
   * clickConversationHandler: Callback function called when user clicks on a new conversation button
   * This only applies when showAddConversationButton is true
   */
  newConversationHandler: PropTypes.func,
  /**
   * showMinimizeButton: Boolean indicates wheter or not to display the minimize button on the header
   */
  showMinimizeButton: PropTypes.bool,
  /**
   * showMenuButton: Boolean indicates wheter or not to display the menu button on the header
   */
  showMenuButton: PropTypes.bool,
  /**
   * showMenuButton: Boolean indicates wheter or not to display the add conversation button
   */
  showAddConversationButton: PropTypes.bool,
  /**
   * noMoreDataText: Text to be displayed when there is no more conversation items (at the end of the conversation list)
   */
  noMoreDataText: PropTypes.string,
  /**
   * newConversationText: Text to be displayed inside the Add Conversation Button
   */
  newConversationText: PropTypes.string,
  /**
   * emptyStateText: Text to be displayed when there are no conversations to display
   */
  emptyStateText: PropTypes.string,
  /**
   * className: Extra className to provide to the component in order to style it when used in different contexts.
   */
  className: PropTypes.string,
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
  showAddConversationButton: true,
  noMoreDataText: '',
  newConversationText: '',
  emptyStateText: '',
  className: '',
};

export default ConversationListBox;
