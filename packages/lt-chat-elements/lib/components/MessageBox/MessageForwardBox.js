import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

// Icons to be used on this component
import FaForward from 'react-icons/lib/fa/mail-forward';

const StyledMessageForwardBox = styled.div`
  display: flex;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  background: #fff;
  position: absolute;
  flex-direction: row;
  align-self: center;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 5px 0 rgba(164, 164, 164, 1);
  cursor: pointer;
  transition: all 0.3s ease;
  top: 0;
  bottom: 0;
  margin: auto;

  ${(props) =>
    props.position === 'left' &&
      css`
        right: -50px
      `};

  ${(props) =>
    props.position === 'right' &&
      css`
        left: -50px
      `};
`;

const MessageForwardBox = (props) => (
  <StyledMessageForwardBox
    position={props.position}
    onClick={props.onForwardClick}
    onKeyPress={props.onForwardClick}
  >
    <FaForward color="#000" />
  </StyledMessageForwardBox>
);

MessageForwardBox.propTypes = {
  /**
   * Position: What side the forward is displayed
   */
  position: PropTypes.string,
  /**
   * onForwardClick: Handler function to be called when user click on forwared message
   */
  onForwardClick: PropTypes.func,
};

export default MessageForwardBox;
