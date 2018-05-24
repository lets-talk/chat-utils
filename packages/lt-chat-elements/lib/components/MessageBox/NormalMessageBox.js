import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { rgba } from 'polished';

// Constants
import constants from '../../utils/constants';
import { textColor, themeColor } from '../../utils/style';

// Other components used by this component
import FileMessage from '../FileMessage';
import PhotoMessage from '../PhotoMessage';
import Loader from '../Loader';
import ActionableMessageBox from '../ActionableMessageBox';

// Helpers components
import MessageTimeBox from './MessageTimeBox';
import MessageForwardBox from './MessageForwardBox';
import { MessageType } from '../../utils/types';

const StyledForwardDiv = styled.div`
  opacity: 0;
  visibility: hidden;
`;
StyledForwardDiv.displayName = 'StyledForwardDiv';

const StyledMessageBody = styled.div`
  margin: 0;
  padding: 0;
  position: relative;
`;
StyledMessageBody.displayName = 'StyledMessageBody';

const StyledMessageTitle = styled.div`
  margin: 0;
  margin-bottom: 8px;

  color: ${(props) => textColor(props.theme, 'light', 'primary')};
  color: rgb(67, 168, 158);
  font-size: ${(props) => props.theme.typography.classes.footnote.fontSize};
  line-height: ${(props) => props.theme.typography.classes.footnote.lineHeight};
  font-weight: ${(props) => props.theme.typography.weights.fontWeightBold};

  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  & > span:hover {
    text-decoration: underline;
  }
`;
StyledMessageTitle.displayName = 'StyledMessageTitle';

const StyledTextMessage = styled.div`
display: inline-block;
width: calc(100% - 50px);
word-break: break-word;
`;
StyledTextMessage.displayName = 'StyledTextMessage';

const StyledTypingMessage = styled.div`
word-break: break-word;
`;
StyledTypingMessage.displayName = 'StyledTypingMessage';

const NormalMessageBox = (props) => {
  const { messagesTypes, personTypes } = constants;

  const { message } = props;

  const StyledNormalMessageContainer = styled.div`
    position: relative;
    padding-bottom: 3px;
    background-color: ${(localProps) => rgba(themeColor(localProps.theme, 'foreground', 'base'), 0.1)};
    border-radius: 5px;
    box-shadow: none;
    margin-top: 3px;
    flex-direction: column;
    margin-bottom: 3px;
    padding: 15px 10px;
    max-width: calc(100% - 70px);

    ${() =>
    (message.position === 'left') &&
        css`
          float: left;
          margin-left: 5px;
          margin-left: ${() => message.person.avatar ? '45px' : '0'};
        `};

    ${() =>
    (message.position === 'right') &&
        css`
          float: right;
          margin-left: 5px;
          margin-right: ${() => message.person.avatar ? '45px' : '0'};
        `};
    

    color: ${(localProps) => textColor(localProps.theme, 'light', 'primary')};
    font-size: ${(localProps) => localProps.theme.typography.classes.footnote.fontSize};
    line-height: ${(localProps) => localProps.theme.typography.classes.footnote.lineHeight};
    font-weight: ${(localProps) => localProps.theme.typography.weights.fontWeightMedium};

    
    ${() =>
    ((message.person.type === personTypes.BOT || message.person.type === personTypes.AGENT) && message.type !== messagesTypes.ACTIONABLE) &&
        css`
          color: ${(localProps) => textColor(localProps.theme, 'light', 'primary')};
          background-color: ${(localProps) => themeColor(localProps.theme, 'background', 'secondary')};
          
          .letstalk-mbox-title {
            color: ${(localProps) => textColor(localProps.theme, 'light', 'primary')};
          }
          .letstalk-mbox-time {
            color: ${(localProps) => textColor(localProps.theme, 'light', 'primary')};
          }
          `};
          
          ${() =>
    (message.type === messagesTypes.ACTIONABLE) &&
            css`
              padding: 0;
              border-radius: 5px;
              box-shadow: 0px 0px 2px 1px rgba(94,124,139,0.3);
              min-width: 50%;
              color: ${(localProps) => textColor(localProps.theme, 'light', 'primary')};
              background-color: ${(localProps) => localProps.theme.palette.common.white};
        `};

    ${() =>
    (message.type !== messagesTypes.TYPING) &&
        css`
          min-width: 170px;
        `};

    &:hover ${StyledForwardDiv} {
      opacity: 1;
      visibility: visible;
    }
  `;
  StyledNormalMessageContainer.displayName = 'StyledNormalMessageContainer';

  return (
    <StyledNormalMessageContainer>
      <StyledMessageBody>
        {
          message.forwarded === true &&
          <StyledForwardDiv>
            <MessageForwardBox {...props} />
          </StyledForwardDiv>
        }

        {
          (message.title) &&
            <StyledMessageTitle
              onClick={props.onTitleClick}
              onKeyPress={props.onTitleClick}
            >
              {
                message.title &&
                <span>{message.title}</span>
              }
            </StyledMessageTitle>
        }

        {
          message.type === messagesTypes.TEXT &&
          <StyledTextMessage>
            {message.text}
          </StyledTextMessage>
        }

        {
          message.type === messagesTypes.TYPING &&
          <StyledTypingMessage>
            <Loader active type="ball-pulse" size="xsmall" color="rgb(113, 131, 150)" />
          </StyledTypingMessage>
        }

        {
          message.type === messagesTypes.PHOTO &&
            <PhotoMessage
              onOpen={props.onOpen}
              onDownload={props.onDownload}
              data={message.data}
              text={message.text}
            />
        }

        {
          message.type === messagesTypes.FILE &&
            <FileMessage
              onOpen={props.onOpen}
              onDownload={props.onDownload}
              data={message.data}
              text={message.text}
            />
        }

        {
          message.type === messagesTypes.ACTIONABLE &&
            <ActionableMessageBox
              data={message.data}
              onClickAction={props.onActionMessageClick}
            />
        }

        {message.type !== messagesTypes.TYPING && message.type !== messagesTypes.ACTIONABLE &&
          <MessageTimeBox
            type={message.type}
            status={message.status}
            dateString={message.dateString}
            date={message.date}
          />
        }

      </StyledMessageBody>
    </StyledNormalMessageContainer>
  );
};


NormalMessageBox.propTypes = {
  message: MessageType,
  /**
   * onTitleClick: Handler function to be called when user click on message title
   */
  onTitleClick: PropTypes.func,
  /**
   * onForwardClick: Handler function to be called when user click on forwared message
   */
  onForwardClick: PropTypes.func,
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
   * className: Extra className to provide to the component in order to style it when used in different contexts.
   */
  className: PropTypes.string,
};

NormalMessageBox.defaultProps = {
  message: {
    position: 'left',
    type: 'text',
    text: '',
    title: null,
    forwarded: false,
    status: '',
    dateString: null,
    person: null,
    date: new Date(),
    data: {},
  },
  onTitleClick: null,
  onActionMessageClick: null,
  onForwardClick: null,
  onClick: null,
  onOpen: null,
  onDownload: null,
  className: '',
};


export default NormalMessageBox;
