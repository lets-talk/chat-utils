import React from 'react';
import PropTypes from 'prop-types';

import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import styled from 'styled-components';
import MdMenu from 'react-icons/lib/md/menu';
import Avatar from '../Avatar';
import { headerMenuButton } from '../../utils/style';

const HeaderDiv = styled.div`
  flex-shrink: 0;
  position: relative;
  font-weight: ${(props) => props.theme.typography.fontWeightSemibold};
  color: ${(props) => props.theme.palette.text.primary};
  background-color: ${(props) => props.theme.palette.background.primary};
  border-radius: 10px 10px 0 0;
  color: white;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 15px 20px;
  color: ${(props) =>
    (props.inverted && props.theme.palette.text.primary)
    || (props.link && props.theme.palette.main)
    || '#fff'};
`;

const HeaderTitle = styled.h4`
  font-size: ${(props) => props.theme.typography.body.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightNormal};
  margin: 0 40px;
  padding: 5px 10px;
`;

const HeaderSubtitle = styled.span`
  font-size: ${(props) => props.theme.typography.caption.fontSize};
`;

const MinimizeButton = styled.button`
  ${headerMenuButton('40px')}
  left: 10px;
`;

const OpenMenuButton = styled.button`
  ${headerMenuButton('40px')}
  right: 10px;
`;

const Header = ({
  title, subtitle, person, toggleChat, openMenu, showMinimizeButton, showMenuButton,
}) => {
  const { avatar = false, status = '' } = person;
  return (
    <HeaderDiv>
      {
        showMinimizeButton &&
        <MinimizeButton onClick={toggleChat}>
          <MdKeyboardArrowDown size={20} color="white" />
        </MinimizeButton>
      }
      {
        showMenuButton &&
        <OpenMenuButton onClick={openMenu}>
          <MdMenu size={20} color="white" />
        </OpenMenuButton>
      }
      {avatar &&
        <Avatar
          src={avatar}
          size="medium"
          withStatus={status.length > 0}
          status={status}
        />
      }
      <HeaderTitle>{title}</HeaderTitle>
      <HeaderSubtitle>{subtitle}</HeaderSubtitle>
    </HeaderDiv>
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
};

Header.defaultProps = {
  title: '',
  subtitle: '',
  person: null,
  toggleChat: null,
  openMenu: null,
  showMinimizeButton: true,
  showMenuButton: true,
};

export default Header;
