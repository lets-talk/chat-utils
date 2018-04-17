import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import moment from 'moment';

// Icons to be used on this component
import IoDoneAll from 'react-icons/lib/io/android-done-all';
import MdIosTime from 'react-icons/lib/md/access-time';
import MdCheck from 'react-icons/lib/md/check';

// Constants
import constants from '../../utils/constants';

const { messagesTypes } = constants;

const StyledMessageTimeBox = styled.div`
  display: inline-block;
  width: 50px;
  text-align: right;
  font-size: ${(props) => props.theme.typography.caption.fontSize};
  position: relative;
  color: ${(props) => props.theme.palette.text.hintSecondary};

  ${(props) =>
    props.thatAbsoluteTime &&
      css`
        float: right
      `};

`;

const StyledStatusSpan = styled.span`
  margin-left: 3px;
`;

const MessageTimeBox = (props) => {
  const thatAbsoluteTime = props.type !== messagesTypes.TEXT && props.type !== messagesTypes.TYPING;
  return (
    <StyledMessageTimeBox thatAbsoluteTime={thatAbsoluteTime}>
      {
        props.date && (props.type !== messagesTypes.TYPING) &&
        (
          props.dateString ||
            moment(props.date).fromNow()
        )
      }
      {
        props.status &&
          <StyledStatusSpan>
            {
              props.status === 'waiting' &&
              <MdIosTime />
            }

            {
              props.status === 'sent' &&
              <MdCheck />
            }

            {
              props.status === 'received' &&
              <IoDoneAll />
            }

            {
              props.status === 'read' &&
              <IoDoneAll color="#4FC3F7" />
            }
          </StyledStatusSpan>
      }
    </StyledMessageTimeBox>
  );
};

MessageTimeBox.propTypes = {
  /**
   * Type of Message: Type of the message. Values are defined as constants.
   * The current supported types are: SYSTEM, TEXT, TYPING, TIME, ACTIONABLE, FILE, PHOTO.
   */
  type: PropTypes.string,
  /**
   * status: Message status. Values are defined as constants.
   * Current supported values are: WAITING, SENT, RECEIVED, READ
   */
  status: PropTypes.string,
  /**
   * date: Message creation date.
   */
  date: PropTypes.instanceOf(Date),
  /**
   * dateString: Formated date string to show. This is the default to use.
   * If this is not provided by default to show the time moment(props.date).fromNow() is used.
   */
  dateString: PropTypes.string,
};

export default MessageTimeBox;
