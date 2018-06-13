import React, { Component } from 'react';
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

const DELAY = 300;
const LOADER_DELAY = 900;

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      showLoading: false,
    };
  }

  onClick(event) {
    const { clickHandler } = this.props;

    event.preventDefault();
    event.stopPropagation();

    this.setState({ disabled: true });

    const handler = clickHandler();
    if (handler && handler instanceof Promise) {
      const loader = setTimeout(() => this.setState({ showLoading: true }), LOADER_DELAY);
      handler.then(() => {
        clearTimeout(loader);

        setTimeout(() => this.setState({
          disabled: false,
          showLoading: false,
        }), DELAY);
      });
    } else {
      this.setState({ disabled: false });
    }
  }

  render() {
    const {
      type, className, disabled, value, color, borderRadius,
    } = this.props;

    return (
      <StyledButtonContainer className={className}>
        <StyledButton
          color={color}
          type={type}
          borderRadius={borderRadius}
          className={classNames('letstalk-button', className)}
          value={this.state.showLoading === true ? 'Processing...' : value}
          disabled={disabled === true ? disabled : this.state.disabled}
          onClick={(event) => this.onClick(event)}
        />
      </StyledButtonContainer>
    );
  }
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']).isRequired,
  value: PropTypes.string.isRequired,
  borderRadius: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  clickHandler: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  borderRadius: '0',
  className: 'LT-Button-Container',
  disabled: false,
};

Button.displayName = 'Button';

export default Button;
