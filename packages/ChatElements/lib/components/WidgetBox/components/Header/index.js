import React from 'react';
import PropTypes from 'prop-types';

import close from '../../../../assets/clear-button.svg';
import './index.scss';

const Header = ({
  title, subtitle, toggleChat, showCloseButton,
}) =>
  (
    <div className="letstalk-header">
      <h4 className="letstalk-title">{title}</h4>
      <span>{subtitle}</span>
      {
        showCloseButton &&
        <button className="letstalk-close-button" onClick={toggleChat}>
          <img src={close} className="letstalk-close" alt="close" />
        </button>
      }
    </div>
  );

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  toggleChat: PropTypes.func,
  showCloseButton: PropTypes.bool,
};

export default Header;
