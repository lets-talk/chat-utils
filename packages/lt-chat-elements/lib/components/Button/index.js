import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';
import { themeColor, textColor } from '../../utils/style';

const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

const StyledButton = styled.input`
  cursor: pointer;
  position: relative;
  color: ${(props) => textColor(props.theme, 'dark', 'primary')};
  background-color: ${(props) => props.color ? props.color : themeColor(props.theme, 'accent', 'base')};  
  height: 40px;
  border-radius: ${(props) => props.borderRadius};
  box-shadow: none;
  padding: 10px 25px;
  float: left;
`;

const Button = (props) => {
  const {
    type, className, disabled, value, color, borderRadius, onClick,
  } = props;

  return (
    <StyledButtonContainer className={className}>
      <StyledButton
        color={color}
        type={type}
        borderRadius={borderRadius}
        className={classNames('letstalk-button', className)}
        value={value}
        disabled={disabled}
        onClick={onClick}
      />
    </StyledButtonContainer>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']).isRequired,
  value: PropTypes.string.isRequired,
  borderRadius: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  borderRadius: '0',
  className: 'LT-Button-Container',
  disabled: false,
};

Button.displayName = 'Button';

export default Button;
