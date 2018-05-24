import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';

import { ellipsis, textColor, themeColor } from '../../utils/style';

const ChatCard = (props) => {
  const {
    title, body, showRenderProp, render,
  } = props;

  const StyledCardContainer = styled.div`
    max-width: ${props.width}px;
    max-height: ${props.height}px;
    padding: 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: ${(innerProps) => themeColor(innerProps.theme, 'background', 'light')};
    border-radius: 6px;
    box-shadow: ${(innerProps) => innerProps.theme.shadows['8p']};
    font-size: ${(innerProps) => innerProps.theme.typography.classes.caption.fontSize};
    line-height: ${(innerProps) => innerProps.theme.typography.classes.caption.lineHeight};
    height: 100%;
    position: relative;
  `;
  StyledCardContainer.displayName = 'StyledCardContainer';

  const StyledCardBody = styled.div`
    margin: 5px 0 0;
    font-size: 14px;
    overflow: hidden;
    line-height: 22px;
    color: #6e7a89;
    -webkit-animation: intercom-notification-body-animation .5s ease;
    animation: intercom-notification-body-animation .5s ease;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  `;
  StyledCardBody.displayName = 'StyledCardBody';

  const StyledCardTitle = styled.div`
    color: ${(innerProps) => textColor(innerProps.theme)};
    font-size: ${(innerProps) => innerProps.theme.typography.classes.caption.fontSize};
    font-weight: ${(innerProps) => innerProps.theme.typography.weights.fontWeightBold};
    display: inline-block;
    vertical-align: middle;
    line-height: 1.2;
    padding-top: 2px;
    ${ellipsis('100%')}
  `;
  StyledCardTitle.displayName = 'StyledCardTitle';

  return (
    <StyledCardContainer>
      <Flex flex="1 1 auto" alignItems="center" pl={2}>
        {showRenderProp && render()}
        <StyledCardTitle>{title}</StyledCardTitle>
      </Flex>
      <Flex flex="1 1 auto">
        <Box p={2} ml="auto" width={1}>
          <StyledCardBody>{body}</StyledCardBody>
        </Box>
      </Flex>
    </StyledCardContainer>
  );
};


ChatCard.propTypes = {
  /**
   * types: default, rounded, circle
   */
  title: PropTypes.string,
  /**
   * types: default, rounded, circle
   */
  body: PropTypes.string,
  /**
   * width: Set the width of the notification
   */
  width: PropTypes.number,
  /**
   * height: Set the height of the card
   */
  height: PropTypes.number,
  /**
   * showRenderProp: Specify if render prop will be called
   */
  showRenderProp: PropTypes.bool,
  /**
   * render: function with a render prop to be show on the title left corner
   */
  render: PropTypes.func,
};

ChatCard.defaultProps = {
  title: '',
  body: '',
  height: 150,
  width: 250,
  showRenderProp: false,
};

export default ChatCard;
