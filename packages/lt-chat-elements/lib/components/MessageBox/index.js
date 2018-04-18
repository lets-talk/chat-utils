import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

// Constants
import constants from '../../utils/constants';

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

const StyledAvatarContainer = styled.div`
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

const { messagesTypes } = constants;

const renderAutomaticMessage = (type, text) => {
  if (type === messagesTypes.SYSTEM) {
    return (<SystemMessage text={text} />);
  } else if (type === messagesTypes.TIME) {
    return (<TimeMarkMessage text={text} />);
  }
  return <div />;
};
const renderNormalMessage = (props) => <NormalMessageBox {...props} />;

const MessageBox = (props) => (
  <StyledMessageBoxContainer
    className={props.className}
    onClick={props.onClick}
    onKeyPress={props.onClick}
  >
    {
      props.person.avatar && props.type !== messagesTypes.SYSTEM &&
      <StyledAvatarContainer position={props.position}>
        <Avatar
          src={props.person.avatar}
          withStatus={false}
          size="xsmall"
        />
      </StyledAvatarContainer>
    }

    {
      props.type === messagesTypes.SYSTEM || props.type === messagesTypes.TIME ?
        renderAutomaticMessage(props.type, props.text)
        :
        renderNormalMessage(props)
    }

  </StyledMessageBoxContainer>
);


MessageBox.propTypes = {
  /**
   * Position: What side the message is displayed inside the chatbox
   */
  position: PropTypes.string,
  /**
   * Type of Message: Type of the message. Values are defined as constants.
   * The current supported types are: SYSTEM, TEXT, TYPING, TIME, ACTIONABLE, FILE, PHOTO.
   */
  type: PropTypes.string,
  /**
   * Text: Actual message content text.
   */
  text: PropTypes.string,
  /**
   * onClick: Handler function that is called on message click action
   */
  onClick: PropTypes.func,
  /**
   * person: Object representing the person that created or submited this message.
   */
  person: PropTypes.object,
  /**
   * className: Extra className to provide to the component in order to style it when used in different contexts.
   */
  className: PropTypes.string,
};

MessageBox.defaultProps = {
  position: 'left',
  type: 'text',
  text: '',
  onClick: null,
  person: null,
  className: '',
};


export default MessageBox;
