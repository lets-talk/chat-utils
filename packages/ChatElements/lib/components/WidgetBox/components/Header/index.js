import React from 'react';
import PropTypes from 'prop-types';

import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import MdMenu from 'react-icons/lib/md/menu';
import Avatar from '../../../Avatar';

import './index.scss';

const Header = ({
  title, subtitle, avatar, toggleChat, openMenu, showMinimizeButton, showMenuButton,
}) =>
  (
    <div className="letstalk-header">
      {avatar && <Avatar src={avatar} size="medium" withStatus status="online" />}
      <h4 className="letstalk-title">{title}</h4>
      <span className="letstalk-subtitle">{subtitle}</span>
      {
        showMinimizeButton &&
        <button className="letstalk-minimize-button" onClick={toggleChat}>
          <MdKeyboardArrowDown size={20} color="white" />
        </button>
      }
      {
        showMenuButton &&
        <button className="letstalk-menu-button" onClick={openMenu}>
          <MdMenu size={20} color="white" />
        </button>
      }
    </div>
  );

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  avatar: PropTypes.string,
  toggleChat: PropTypes.func,
  openMenu: PropTypes.func,
  showMinimizeButton: PropTypes.bool,
  showMenuButton: PropTypes.bool,
};

export default Header;
