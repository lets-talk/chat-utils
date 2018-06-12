import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

// Constants Types
import { messagesTypes, messagesStatus, personTypes } from '../../utils/constants';

// Other components used by this component
import SystemMessage from '../SystemMessage';
import TimeMarkMessage from '../TimeMarkMessage';
import Avatar from '../Avatar';

// Helpers components
import NormalMessageBox from './NormalMessageBox';

const StyledMessageBoxContainer = styled.div`
  position: relative;
  flex-direction: column;
  display: block;
  overflow: hidden;
  min-width: 200px;
  &:hover div {
    opacity: 1;
    visibility: visible;
  }
`;
StyledMessageBoxContainer.displayName = 'StyledMessageBoxContainer';

const StyledMessageBoxAvatarContainer = styled.div`
  display: inline-block;
  position: absolute;
  bottom: 0;
  ${(props) =>
    props.position === 'left' &&
      css`
        float: left;
        left: 0;
      `};

  ${(props) =>
    props.position === 'right' &&
      css`
        float: right;
        right: 0;
      `};
`;
StyledMessageBoxAvatarContainer.displayName = 'StyledMessageBoxAvatarContainer';

const renderAutomaticMessage = (props, message) => {
  if (message.type === messagesTypes.SYSTEM) {
    return (<SystemMessage {...props} />);
  } else if (message.type === messagesTypes.TIME) {
    return (<TimeMarkMessage {...props} />);
  }
  return <div />;
};

const renderNormalMessage = (props) => <NormalMessageBox {...props} />;

const MessageBox = (props) => {
  const { className, onMessageClick, message } = props;
  const {
    type, person, position,
  } = message;

  return (
    <StyledMessageBoxContainer
      className={className}
      onClick={onMessageClick}
      onKeyPress={onMessageClick}
    >
      {
        person.avatar && type !== messagesTypes.SYSTEM &&
        <StyledMessageBoxAvatarContainer position={position}>
          <Avatar
            src={person.avatar}
            withStatus={false}
            size="xsmall"
          />
        </StyledMessageBoxAvatarContainer>
      }

      {
        type === messagesTypes.SYSTEM || type === messagesTypes.TIME ?
          renderAutomaticMessage(props, props.message)
          :
          renderNormalMessage(props)
      }
    </StyledMessageBoxContainer>
  );
};


MessageBox.propTypes = {
  /**
   * message: Actual message object.
   */
  message: PropTypes.shape({
    /**
     * Id: Message unique identifier
     */
    id: PropTypes.number,
    /**
     * Position: What side the message is displayed inside the chatbox
     */
    position: PropTypes.oneOf(['left', 'right']),
    /**
     * Type of Message: Type of the message. Values are defined as constants.
     * The current supported types are: SYSTEM, TEXT, TYPING, TIME, ACTIONABLE, FILE, PHOTO.
     */
    type: PropTypes.oneOf(Object.values(messagesTypes)),
    /**
    * forwarded: Boolean that indicates if message was forwareded. If this is false (default) onForwardClick
    * handler has no effect at all
    */
    forwarded: PropTypes.bool,
    /**
     * Title: Message title. Is used to display as a first line. It is also possible to make it clickable
     */
    title: PropTypes.string,
    /**
     * Text: Actual message content text.
     */
    text: PropTypes.string,
    /**
     * data: Object with extra data used to display information about the message
     */
    data: PropTypes.object,
    /**
     * status: Message status. Values are defined as constants.
     * Current supported values are: WAITING, SENT, RECEIVED, READ
     */
    status: PropTypes.oneOf(Object.values(messagesStatus)),
    /**
     * date: Message creation date.
     */
    date: PropTypes.instanceOf(Date),
    /**
     * dateString: Formated date string to show. This is the default to use.
     * If this is not provided by default to show the time moment(props.date).fromNow() is used.
     */
    dateString: PropTypes.string,
    /**
     * person: Object representing the person that created or submited this message.
     */
    person: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      internal_name: PropTypes.string,
      active: PropTypes.bool,
      email: PropTypes.string,
      avatar: PropTypes.string,
      role: PropTypes.string,
      status_name: PropTypes.string,
      availability_status_name: PropTypes.string,
      type: PropTypes.oneOf(Object.values(personTypes)),
    }),
  }),
  /**
   * onMessageClick: Handler function that is called on message click action
   */
  onMessageClick: PropTypes.func,
  /**
   * className: Extra className to provide to the component in order to style it when used in different contexts.
   */
  className: PropTypes.string,
};

MessageBox.defaultProps = {
  position: 'left',
  type: 'text',
  text: '',
  onMessageClick: null,
  person: null,
  className: '',
};

MessageBox.displayName = 'MessageBox';

export default MessageBox;
