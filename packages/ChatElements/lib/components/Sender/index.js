import React from 'react';
import PropTypes from 'prop-types';

import MdSend from 'react-icons/lib/md/send';
import './index.scss';

const Sender = ({ sendMessage, placeholder, disabledInput }) =>
  (
    <form className="letstalk-sender" onSubmit={sendMessage}>
      <input type="text" className="letstalk-new-message" name="message" placeholder={placeholder} disabled={disabledInput} autoFocus autoComplete="off" />
      <button type="submit" className="letstalk-send">
        <MdSend size={32} color="#c2cdd3" />
      </button>
    </form>
  );

Sender.propTypes = {
  sendMessage: PropTypes.func,
  placeholder: PropTypes.string,
  disabledInput: PropTypes.bool,
};

export default Sender;
