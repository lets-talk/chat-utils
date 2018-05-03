import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';

import MdClose from 'react-icons/lib/md/close';

import AvatarGroup from '../AvatarGroup';
import ChatCard from '../ChatCard';
import { PersonType } from '../../utils/types';
import { textColor, themeColor } from '../../utils/style';


const ChatNotification = (props) => {
  const {
    showAvatars, persons, title, body, dismissText, avatarPosition, width, height,
  } = props;

  const StyledDismissButton = styled.button`
    display: flex;
    cursor: pointer;
    float: right;
    opacity: 0;
    padding: 8px 15px;
    border-radius: 100px;
    color: ${(innerProps) => textColor(innerProps.theme, 'dark', 'primary')};
    background-color: ${(innerProps) => themeColor(innerProps.theme, 'foreground', 'base')};
    font-size: ${(innerProps) => innerProps.theme.typography.classes.caption.fontSize};
    line-height: ${(innerProps) => innerProps.theme.typography.classes.caption.lineHeight};
    font-weight: ${(innerProps) => innerProps.theme.typography.weights.fontWeightMedium};
  
    span {
      margin-left: 10px;
    }
  `;

  const StyledNotificationContainer = styled.div`
    max-width: ${props.width}px;
    max-height: ${props.height}px;

    border-radius: ${() =>
    (props.type && props.type === 'rounded' && '5px 5px 0 0')
    || (props.type && props.type === 'circle' && '50%')
    || '0'};

    &:hover ${StyledDismissButton} {
      opacity: 1;
      visibility: visible;
    }

    &:focus {
      outline: none;
    }
  `;

  const StyledNotificationBody = styled.div`
    height: 100%;
    position: relative;
    clear: both;
`;

  const StyledChatSnippet = styled.div`
    height: 100%;
    position: relative;
  `;

  const avatarOutside = avatarPosition === 'out';

  return (
    <StyledNotificationContainer>
      <Flex>
        <Box p={1} width={1}>
          <StyledDismissButton>
            <div>
              {dismissText}
            </div>
            <span>
              <MdClose size={15} />
            </span>
          </StyledDismissButton>
        </Box>
      </Flex>
      <Flex>
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
   * types: default, rounded, circle
   */
  type: PropTypes.string,
  /**
   * title
   */
  title: PropTypes.string,
  /**
   * dismissText
   */
  dismissText: PropTypes.string,
  /**
   * body
   */
  body: PropTypes.string,
  /**
   * showAvatars: Wheter or not display the chat icon
   */
  showAvatars: PropTypes.bool,
  /**
   * avatarPosition: Wheter or not display the chat icon
   */
  avatarPosition: PropTypes.oneOf(['in', 'out']),
  /**
   * showAvatars: Wheter or not display the chat icon
   */
  persons: PropTypes.arrayOf(PersonType),
  /**
   * width: Set the width of the notification
   */
  width: PropTypes.number,
  /**
   * height: Set the height of the notification
   */
  height: PropTypes.number,
};

ChatNotification.defaultProps = {
  type: 'rounded',
  persons: [],
  showAvatars: true,
  avatarPosition: 'out',
  dismissText: 'Cerrar',
};

export default ChatNotification;
