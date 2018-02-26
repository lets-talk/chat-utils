import React from 'react';
import PropTypes from 'prop-types';

import MdSend from 'react-icons/lib/md/send';
import './index.scss';

const Sender = ({ sendMessage, placeholder, disabledInput }) =>
  (
    <div className="letstalk-sender-container">
      <div className="letstalk-sender-wrapper">
        <form onSubmit={sendMessage}>
          <textarea
            type="text"
            name="message"
            placeholder={placeholder}
            disabled={disabledInput}
            autoComplete="off"
          />
          <div className="letstalk-sender-buttons">
            <button type="submit" className="letstalk-send-button">
              <MdSend size={20} color="#5e7c8b" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );

Sender.propTypes = {
  sendMessage: PropTypes.func,
  placeholder: PropTypes.string,
  disabledInput: PropTypes.bool,
};

export default Sender;
