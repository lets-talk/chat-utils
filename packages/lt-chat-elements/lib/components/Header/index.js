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
  color: ${(props) => props.theme.typography.classes.body.bold.light.primary.color};
  font-size: ${(props) => props.theme.typography.classes.body.bold.light.primary.fontSize};
  font-weight: ${(props) => props.theme.typography.weights.fontWeightSemibold};

  margin: 0 10px;
  padding: 5px 10px;
`;

const HeaderSubtitle = styled.span`
  color: ${(props) => props.theme.typography.classes.caption.normal.light.secondary.color};
  font-size: ${(props) => props.theme.typography.classes.caption.normal.light.secondary.fontSize};
  font-weight: ${(props) => props.theme.typography.classes.caption.normal.light.secondary.fontWeight};
  margin: 0 10px;
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
  person: {},
  toggleChat: null,
  openMenu: null,
  showMinimizeButton: true,
  showMenuButton: true,
};

export default Header;
