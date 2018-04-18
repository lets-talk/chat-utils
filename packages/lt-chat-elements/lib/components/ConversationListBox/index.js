import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from '../Header';
import ConversationList from '../ConversationList/Loadable';
import Button from '../Button';

const ConversationListBoxContainer = styled.div`
  border-radius: 10px 10px 0px 0px;
  box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.44);
  height: 100%;
  width: 100%;
  margin: 0;
  max-width: none;
  padding-bottom: 10px;
`;

const ConversationListBox = (props) => {
  const {
    conversations,
    title,
    subtitle,
    person,
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
    <ConversationListBoxContainer className={className}>
      <Header
        title={title}
        subtitle={subtitle}
        person={person}
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
    </ConversationListBoxContainer>
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
   * persona: Avatar image to display on the header of the component
   */
  person: PropTypes.object,
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
  person: {},
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
  className: 'LT-ConversationListBox-Wrapper',
};

export default ConversationListBox;
