import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

// Constants
import constants from '../../utils/constants';

// Other components used by this component
import FileMessage from '../FileMessage';
import PhotoMessage from '../PhotoMessage';
import Loader from '../Loader';
import ActionableMessageBox from '../ActionableMessageBox';

// Helpers components
import MessageTimeBox from './MessageTimeBox';
import MessageForwardBox from './MessageForwardBox';

const StyledForwardDiv = styled.div`
  opacity: 0;
  visibility: hidden;
`;

const StyledMessageBody = styled.div`
  margin: 0;
  padding: 0;
  position: relative;
`;

const StyledMessageTitle = styled.div`
  margin: 0;
  margin-bottom: 8px;

  color: ${(props) => props.theme.typography.classes.caption.bold.dark.secondary.color};
  font-size: ${(props) => props.theme.typography.classes.caption.bold.dark.secondary.fontSize};
  font-weight: ${(props) => props.theme.typography.classes.caption.bold.dark.secondary.fontWeight};

  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  & > span:hover {
    text-decoration: underline;
  }
`;

const StyledTextMessage = styled.div`
  display: inline-block;
  width: calc(100% - 50px);
  word-break: break-word;
`;

const StyledTypingMessage = styled.div`
  word-break: break-word;
`;

const NormalMessageBox = (props) => {
  const { messagesTypes, personTypes } = constants;

  const StyledNormalMessageContainer = styled.div`
    position: relative;
    padding-bottom: 3px;
    background-color: ${(localProps) => localProps.theme.palette.background.primary};
    border-radius: 5px;
    box-shadow: none;
    margin-top: 3px;
    flex-direction: column;
    margin-bottom: 3px;
    padding: 15px 10px;

    ${() =>
    (props.position === 'left') &&
        css`
          float: left;
          margin-left: 5px;
          margin-left: ${() => props.person.avatar ? '45px' : '0'};
        `};

    ${() =>
    (props.position === 'right') &&
        css`
          float: right;
          margin-left: 5px;
          margin-right: ${() => props.person.avatar ? '45px' : '0'};
        `};
    

    color: ${(localProps) => localProps.theme.typography.classes.footnote.normal.light.primary.color};
    font-size: ${(localProps) => localProps.theme.typography.classes.footnote.normal.light.primary.fontSize};
    font-weight: ${(localProps) => localProps.theme.typography.classes.footnote.normal.light.primary.fontWeight};
    
    ${() =>
    ((props.person.type === personTypes.BOT || props.person.type === personTypes.AGENT) && props.type !== messagesTypes.ACTIONABLE) &&
        css`
          color: ${(localProps) => localProps.theme.palette.text.primary};
          background-color: ${(localProps) => localProps.theme.palette.background.secondary};
          .letstalk-mbox-title {
            color: ${(localProps) => localProps.theme.palette.text.primary};
          }
          .letstalk-mbox-time {
            color: ${(localProps) => localProps.theme.palette.text.primary};
          }
        `};

    ${() =>
    (props.type === messagesTypes.ACTIONABLE) &&
        css`
          padding: 0;
          border-radius: 5px;
          box-shadow: 0px 0px 2px 1px rgba(94,124,139,0.3);
          background-color: ${(localProps) => localProps.theme.palette.common.white};
          min-width: 50%;
          color: ${(localProps) => localProps.theme.palette.text.primary};
        `};

    ${() =>
    (props.type !== messagesTypes.TYPING) &&
        css`
          min-width: 170px;
        `};

    &:hover ${StyledForwardDiv} {
      opacity: 1;
      visibility: visible;
    }
  `;

  return (
    <StyledNormalMessageContainer>
      <StyledMessageBody>
        {
          props.forwarded === true &&
          <StyledForwardDiv>
            <MessageForwardBox {...props} />
          </StyledForwardDiv>
        }

        {
          (props.title) &&
            <StyledMessageTitle
              onClick={props.onTitleClick}
              onKeyPress={props.onTitleClick}
            >
              {
                props.title &&
                <span>{props.title}</span>
              }
            </StyledMessageTitle>
        }

        {
          props.type === messagesTypes.TEXT &&
          <StyledTextMessage>
            {props.text}
          </StyledTextMessage>
        }

        {
          props.type === messagesTypes.TYPING &&
          <StyledTypingMessage>
            <Loader active type="ball-pulse" size="xsmall" color="rgb(113, 131, 150)" />
          </StyledTypingMessage>
        }

        {
          props.type === messagesTypes.PHOTO &&
          <PhotoMessage
            onOpen={props.onOpen}
            onDownload={props.onDownload}
            data={props.data}
            text={props.text}
          />
        }

        {
          props.type === messagesTypes.FILE &&
          <FileMessage
            onOpen={props.onOpen}
            onDownload={props.onDownload}
            data={props.data}
            text={props.text}
          />
        }

        {
          props.type === messagesTypes.ACTIONABLE &&
          <ActionableMessageBox
            data={props.data}
            onClickAction={props.onActionMessageClick}
          />
        }

        {props.type !== messagesTypes.TYPING && props.type !== messagesTypes.ACTIONABLE &&
        <MessageTimeBox
          type={props.type}
          status={props.status}
          dateString={props.dateString}
          date={props.date}
        />
        }

      </StyledMessageBody>
    </StyledNormalMessageContainer>
  );
};


NormalMessageBox.propTypes = {
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
   * Title: Message title. Is used to display as a first line. It is also possible to make it clickable
   */
  title: PropTypes.string,
  /**
   * onTitleClick: Handler function to be called when user click on message title
   */
  onTitleClick: PropTypes.func,
  /**
   * onForwardClick: Handler function to be called when user click on forwared message
   */
  onForwardClick: PropTypes.func,
  /**
   * date: Message creation date.
   */
  date: PropTypes.instanceOf(Date),
  /**
   * data: Object with extra data used to display information about the message
   */
  data: PropTypes.object,
  /**
   * onClick: Handler function that is called on message click action
   */
  onClick: PropTypes.func,
  /**
   * onActionMessageClick: Handler function that is called when user click on an item of
   * a message that contains actionable action list
   */
  onActionMessageClick: PropTypes.func,
  /**
   * onOpen: Handler function that is called when user tries to open a File/Photo message type
   */
  onOpen: PropTypes.func,
  /**
  * onDownload: Handler function that is called when user tries to download a File/Photo message type
  */
  onDownload: PropTypes.func,
  /**
  * forwarded: Boolean that indicates if message was forwareded. If this is false (default) onForwardClick
  * handler has no effect at all
  */
  forwarded: PropTypes.bool,
  /**
   * status: Message status. Values are defined as constants.
   * Current supported values are: WAITING, SENT, RECEIVED, READ
   */
  status: PropTypes.string,
  /**
   * dateString: Formated date string to show. This is the default to use.
   * If this is not provided by default to show the time moment(props.date).fromNow() is used.
   */
  dateString: PropTypes.string,
  /**
   * person: Object representing the person that created or submited this message.
   */
  person: PropTypes.object,
  /**
   * className: Extra className to provide to the component in order to style it when used in different contexts.
   */
  className: PropTypes.string,
};

NormalMessageBox.defaultProps = {
  position: 'left',
  type: 'text',
  text: '',
  title: null,
  onTitleClick: null,
  onActionMessageClick: null,
  onForwardClick: null,
  date: new Date(),
  data: {},
  onClick: null,
  onOpen: null,
  onDownload: null,
  forwarded: false,
  status: '',
  dateString: null,
  person: null,
  className: '',
};


export default NormalMessageBox;
