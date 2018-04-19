import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MdSend from 'react-icons/lib/md/send';
// import './index.scss';

const StyledSenderContainer = styled.div`
  min-height: 56px;
  max-height: 200px;
  color: ${(props) => props.theme.palette.text.hint};
  align-items: center;
  display: flex;
  background-color: rgba(94, 124, 139, 0.1);

  border-radius: 0;
  flex-shrink: 0;
  & > div {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    min-height: 56px;
    max-height: 200px;
  }

  textarea {
    position: absolute;
    bottom: 0;
    left: 0;
    border: 0;
    box-sizing: border-box;
    padding: 22px 100px 10px 30px;
    width: 100%;
    height: 100%;

    color: ${(props) => props.theme.typography.classes.body.normal.dark.primary.color};
    font-size: ${(props) => props.theme.typography.classes.body.normal.dark.primary.fontSize};
    font-weight: ${(props) => props.theme.typography.classes.body.normal.dark.primary.fontWeight};

    white-space: pre-wrap;
    background-color: rgba(94, 124, 139, 0.1);
    resize: none;
    border: none;
  }

  textarea:focus {
    background-color: ${(props) => props.theme.palette.common.white};
    outline: none;
    box-shadow: 0 0 100px 0 rgba(150,165,190,.24);
    transition: background-color .2s ease,box-shadow .2s ease,-webkit-box-shadow .2s ease;
  }

  textarea::placeholder {
    color: ${(props) => props.theme.typography.classes.body.normal.dark.disabled.color};
  }
`;

const StyledSenderButtonsContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 30px;
  height: 56px;
  line-height: 56px;
  button {
    border: none;
    background: transparent;
  }
`;

const Sender = ({ sendMessage, placeholder, disabledInput }) =>
  (
    <StyledSenderContainer>
      <div>
        <form onSubmit={sendMessage}>
          <textarea
            type="text"
            name="message"
            placeholder={placeholder}
            disabled={disabledInput}
            autoComplete="off"
          />
          <StyledSenderButtonsContainer>
            <button type="submit">
              <MdSend size={20} color="#5e7c8b" />
            </button>
          </StyledSenderButtonsContainer>
        </form>
      </div>
    </StyledSenderContainer>
  );

Sender.propTypes = {
  sendMessage: PropTypes.func,
  placeholder: PropTypes.string,
  disabledInput: PropTypes.bool,
};

export default Sender;
