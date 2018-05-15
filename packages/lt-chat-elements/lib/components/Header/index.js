import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import MdMenu from 'react-icons/lib/md/menu';
import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import Avatar from '../Avatar';
import { headerMenuButton, themeColor, textColor } from '../../utils/style';

const StyledHeaderContainer = styled.div`
  background-color: ${(props) => themeColor(props.theme, 'accent', 'base')};
  color: ${(props) => textColor(props.theme, 'dark', 'primary')};
  border-radius: 10px 10px 0 0;
  text-align: center;
  padding: 15px 20px;

  button {
    color: ${(props) => textColor(props.theme, 'dark', 'primary')};
    ${headerMenuButton('40px')};
  }

  h4 {
    margin: 0;
    font-size: ${(props) => props.theme.typography.classes.body.fontSize};
    line-height: ${(props) => props.theme.typography.classes.body.lineHeight};
    font-weight: ${(props) => props.theme.typography.weights.fontWeightMedium};
  }

  span {
    color: ${(props) => textColor(props.theme, 'dark', 'secondary')};
    font-size: ${(props) => props.theme.typography.classes.caption.fontSize};
    line-height: ${(props) => props.theme.typography.classes.caption.lineHeight};
    font-weight: ${(props) => props.theme.typography.weights.fontWeightThin};
  }
`;

const StyledAvatarContainer = styled.div`
  margin-bottom: 10px;
`;

const Header = ({
  className, title, subtitle, person, toggleChat, openMenu, showMinimizeButton, showMenuButton, leftButtons, rightButtons,
}) => {
  const { avatar = false, status = '' } = person;
  return (
    <StyledHeaderContainer className={className}>
      <Flex alignItems="center">
        {showMenuButton &&
          <Box flex="0 0 auto" mb="auto" width="40px">
            <button onClick={openMenu}>
              <MdMenu size={20} />
            </button>
          </Box>
        }
        {leftButtons.map((btn) => (
          <Box flex="0 0 auto" mb="auto" width="40px">
            <button onClick={btn.onClick}>
              {btn.icon}
            </button>
          </Box>
        ))}

        <Box flex="1 1 auto">
          {avatar &&
            <StyledAvatarContainer>
              <Avatar
                src={avatar}
                size="medium"
                withStatus={status.length > 0}
                status={status}
              />
            </StyledAvatarContainer>
          }
          {title && <h4>{title}</h4>}
          {subtitle && <span>{subtitle}</span>}
        </Box>

        {rightButtons.map((btn) => (
          <Box flex="0 0 auto" mb="auto" width="40px">
            <button onClick={btn.onClick}>
              {btn.icon}
            </button>
          </Box>
        ))}

        {showMinimizeButton &&
          <Box flex="0 0 auto" mb="auto" width="40px">
            <button onClick={toggleChat}>
              <MdKeyboardArrowDown size={20} />
            </button>
          </Box>
        }
      </Flex>
    </StyledHeaderContainer>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  person: PropTypes.shape({
    avatar: PropTypes.string,
    status: PropTypes.string,
    email: PropTypes.string,
    type: PropTypes.string,
  }),
  toggleChat: PropTypes.func,
  openMenu: PropTypes.func,
  showMinimizeButton: PropTypes.bool,
  showMenuButton: PropTypes.bool,
  leftButtons: PropTypes.arrayOf(PropTypes.shape({
    onClick: PropTypes.func,
    icon: PropTypes.node,
  })),
  rightButtons: PropTypes.arrayOf(PropTypes.shape({
    onClick: PropTypes.func,
    icon: PropTypes.node,
  })),
};

Header.defaultProps = {
  className: 'LT-Header-Container',
  title: '',
  subtitle: '',
  person: {

  },
  toggleChat: null,
  openMenu: null,
  showMinimizeButton: true,
  showMenuButton: true,
  leftButtons: [],
  rightButtons: [],
};

Header.displayName = 'Header';

export default Header;
