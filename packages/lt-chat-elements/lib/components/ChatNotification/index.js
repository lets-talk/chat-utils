import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';

import MdClose from 'react-icons/lib/md/close';

import AvatarGroup from '../AvatarGroup';
import ChatCard from '../ChatCard';
import { PersonType } from '../../utils/types';
import { textColor, themeColor } from '../../utils/style';

const StyledDismissButton = styled.button`
  display: flex;
  cursor: pointer;
  float: right;
  opacity: 0;
  padding: 8px 15px;
  border-radius: 100px;
  color: ${(props) => textColor(props.theme, 'dark', 'primary')};
  background-color: ${(props) => themeColor(props.theme, 'foreground', 'base')};
  font-size: ${(props) => props.theme.typography.classes.caption.fontSize};
  line-height: ${(props) => props.theme.typography.classes.caption.lineHeight};
  font-weight: ${(props) => props.theme.typography.weights.fontWeightMedium};

  span {
    margin-left: 10px;
  }
`;
StyledDismissButton.displayName = 'StyledDismissButton';

const StyledNotificationBody = styled.div`
  height: 100%;
  position: relative;
  clear: both;
`;
StyledNotificationBody.displayName = 'StyledNotificationBody';

const StyledChatSnippet = styled.div`
  height: 100%;
  position: relative;
`;
StyledChatSnippet.displayName = 'StyledChatSnippet';


const ChatNotification = (props) => {
  const {
    showAvatars, persons, title, body, dismissText, onDismiss, onClick, avatarPosition, width, height,
  } = props;

  const StyledNotificationContainer = styled.div`
    max-width: ${props.width}px;
    max-height: ${props.height}px;

    border-radius: 5px 5px 0 0;
    &:hover ${StyledDismissButton} {
      opacity: 1;
      visibility: visible;
    }

    &:focus {
      outline: none;
    }
  `;
  StyledNotificationContainer.displayName = 'StyledNotificationContainer';

  const avatarOutside = avatarPosition === 'out';

  return (
    <StyledNotificationContainer>
      <Flex>
        <Box p={1} width={1}>
          <StyledDismissButton onClick={onDismiss}>
            <div>
              {dismissText}
            </div>
            <span>
              <MdClose size={15} />
            </span>
          </StyledDismissButton>
        </Box>
      </Flex>
      <Flex onClick={onClick}>
        <Box p={1} m={2}>
          {showAvatars && avatarOutside &&
          <AvatarGroup avatars={persons} />
          }
        </Box>
        <Box pt={1} width={1}>
          <StyledNotificationBody>
            <StyledChatSnippet>
              <ChatCard
                width={width}
                height={height}
                title={title}
                body={body}
                showRenderProp={showAvatars && !avatarOutside}
                render={() => <AvatarGroup avatars={persons} groupType="line" />}
              />
            </StyledChatSnippet>
          </StyledNotificationBody>
        </Box>
      </Flex>
    </StyledNotificationContainer>
  );
};


ChatNotification.propTypes = {
  /**
   * The text to show in the notification header
   */
  title: PropTypes.string.isRequired,
  /**
   * The text to show as the notification content
   */
  body: PropTypes.string.isRequired,
  /**
   * Text to show next to the 'x' icon to dismiss the notification
   */
  dismissText: PropTypes.string,
  /**
   * Function to execute when user clicks Dismiss Button
   */
  onDismiss: PropTypes.func,
  /**
   * Function to execute when user clicks on Notification content
   */
  onClick: PropTypes.func,
  /**
   * Whether or not display a group (could be one) of avatars
   */
  showAvatars: PropTypes.bool,
  /**
   * Where to show the avatars (only apply if showAvatars is true)
   * valid positions: in (inside the notification card) out (outside the nofitication card)
   */
  avatarPosition: PropTypes.oneOf(['in', 'out']),
  /**
   * List of PersonType to show as avatars (only used if showAvatars is true)
   */
  persons: PropTypes.arrayOf(PersonType),
  /**
   * Set the width of the notification
   */
  width: PropTypes.number,
  /**
   * Set the height of the notification
   */
  height: PropTypes.number,
};

ChatNotification.defaultProps = {
  dismissText: 'Cerrar',
  onDismiss: null,
  onClick: null,
  showAvatars: true,
  avatarPosition: 'in',
  persons: [],
  width: 350,
  height: 100,
};

export default ChatNotification;
