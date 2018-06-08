import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

// Icons to be used on this component
import IoDoneAll from 'react-icons/lib/io/android-done-all';
import MdIosTime from 'react-icons/lib/md/access-time';
import MdCheck from 'react-icons/lib/md/check';

// Constants
import constants from '../../utils/constants';
import { textColor } from '../../utils/style';

const { messagesTypes } = constants;

const StyledMessageTimeBoxContainer = styled.div`
  max-width: 80px;
  text-align: right;
  color: ${(props) => textColor(props.theme, 'light', 'disabled')};
  font-size: ${(props) => props.theme.typography.classes.caption.fontSize};
  line-height: ${(props) => props.theme.typography.classes.caption.lineHeight};
  font-weight: ${(props) => props.theme.typography.weights.fontWeightMedium};
  float: right
  position: absolute;
  bottom: 0;
  right: 0;
`;
StyledMessageTimeBoxContainer.displayName = 'StyledMessageTimeBoxContainer';

const StyledTimeAgoText = styled.span`
  font-size: ${(props) => props.theme.typography.classes.small.fontSize};
`;
StyledTimeAgoText.displayName = 'StyledTimeAgoText';

const StyledStatusSpan = styled.span`
  margin-left: 3px;
`;
StyledStatusSpan.displayName = 'StyledStatusSpan';

const MessageTimeBox = (props) => (
  <StyledMessageTimeBoxContainer>
    {
      props.date && (props.type !== messagesTypes.TYPING) &&
      <StyledTimeAgoText>
        {props.dateString || moment(props.date).fromNow()}
      </StyledTimeAgoText>
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
  </StyledMessageTimeBoxContainer>
);

MessageTimeBox.propTypes = {
  /**
   * Type of Message: Type of the message. Values are defined as constants.
   * The current supported types are: SYSTEM, TEXT, TYPING, TIME, ACTIONABLE, FILE, PHOTO.
   */
  type: PropTypes.string.isRequired,
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

MessageTimeBox.defaultProps = {
  status: '',
  date: null,
  dateString: '',
};

export default MessageTimeBox;
