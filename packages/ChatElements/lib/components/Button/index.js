import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

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
      type, className, disabled, value,
    } = this.props;

    return (
      <div className="letstalk-button-container">
        <input
          type={type}
          className={classNames('letstalk-button', className)}
          value={this.state.showLoading === true ? 'Processing...' : value}
          disabled={disabled === true ? disabled : this.state.disabled}
          onClick={(event) => this.onClick(event)}
        />
      </div>
    );
  }
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']).isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default Button;
