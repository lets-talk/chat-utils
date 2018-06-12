import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import MdMenu from 'react-icons/lib/md/menu';
import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import Avatar from '../Avatar';

const StyledAvatarContainer = styled.div`
  margin-bottom: 10px;
`;

const Header = ({
  title, subtitle, person, toggleChat, openMenu, showMinimizeButton, showMenuButton, leftButtons, rightButtons,
}) => {
  const { avatar = false, status = '' } = person;
  return (
    <div>
      <Flex alignItems="center">
        {showMenuButton &&
        <Box flex="0 0 auto" mb="auto" width="40px">
          <button onClick={openMenu}>
            <MdMenu size={20} />
          </button>
        </Box>
        }
        {leftButtons.map((btn) => (
          <Box key={btn.id} flex="0 0 auto" mb="auto" width="40px">
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
          <Box key={btn.id} flex="0 0 auto" mb="auto" width="40px">
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
    </div>
  );
};

Header.propTypes = {
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
  title: '',
  subtitle: '',
  person: {},
  toggleChat: null,
  openMenu: null,
  showMinimizeButton: true,
  showMenuButton: true,
  leftButtons: [],
  rightButtons: [],
};

Header.displayName = 'Header';

export default Header;
