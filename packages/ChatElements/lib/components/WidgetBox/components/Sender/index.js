import React from 'react';
import PropTypes from 'prop-types';

import send from '../../../../assets/send_button.svg';
import './index.scss';

const Sender = ({ sendMessage, placeholder, disabledInput }) =>
  (
    <form className="letstalk-sender" onSubmit={sendMessage}>
      <input type="text" className="letstalk-new-message" name="message" placeholder={placeholder} disabled={disabledInput} autoFocus autoComplete="off" />
      <button type="submit" className="letstalk-send">
        <img src={send} className="letstalk-send-icon" alt="send" />
      </button>
    </form>
  );

Sender.propTypes = {
  sendMessage: PropTypes.func,
  placeholder: PropTypes.string,
  disabledInput: PropTypes.bool,
};

export default Sender;
