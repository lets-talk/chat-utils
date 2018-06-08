import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { textColor, themeColor } from '../../utils/style';

const StyledTag = styled.span`
  color: ${(props) => textColor(props.theme, 'dark', 'primary')};
  background-color: ${(props) => themeColor(props.theme, 'foreground', 'base')};
  font-size: ${(props) => props.theme.typography.classes.caption.fontSize};
  line-height: ${(props) => props.theme.typography.classes.caption.lineHeight};
  font-weight: ${(props) => props.theme.typography.weights.fontWeightMedium};

  margin: 5px 2px;
  padding: 5px;
  border-radius: 2px;
`;

class Tag extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(item, i, e) {
    if (this.props.onClick instanceof Function) {
      this.props.onClick(item, i, e);
    }
  }

  render() {
    const { data } = this.props;
    return (
      <StyledTag onClick={this.onClick}>
        {data.name}
      </StyledTag>
    );
  }
}

Tag.propTypes = {
  /**
   * data is an object containing the Tag data
   */
  data: PropTypes.object,
  /**
   * className to be used for this component
   */
  /* eslint-disable react/no-unused-prop-types */
  className: PropTypes.string,
  /**
   * Callback function to be called when an item is clicked
   */
  onClick: PropTypes.func,
};

Tag.defaultProps = {
  data: {},
  className: 'LT-Tag-Container',
  onClick: null,
};

export default Tag;
