import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';

import AvatarGroup from '../AvatarGroup';
import ChatCard from '../ChatCard';
import { PersonType } from '../../utils/types';


const ChatNotification = (props) => {
  const {
    showAvatars, persons, title, body, dismissText, avatarPosition, width, height,
  } = props;

  const StyledDismissButton = styled.button`
    cursor: pointer;
    background-color: rgb(93, 114, 138);
    color: #fff;
    font-size: 13px;
    float: right;
    opacity: 0;
    padding: 8px 20px;
    border-radius: 100px;
    color: ${(innerProps) => innerProps.theme.palette.common.white};
    font-size: ${(innerProps) => innerProps.theme.typography.classes.small.normal.dark.primary.fontSize};
    font-weight: ${(innerProps) => innerProps.theme.typography.weights.fontWeightMedium};
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
        <Box p={1} ml="auto" width={1}>
          <StyledDismissButton>{dismissText}</StyledDismissButton>
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
