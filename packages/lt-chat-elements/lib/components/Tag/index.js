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
  onClick(item, i, e) {
    if (this.props.clickItem instanceof Function) {
      this.props.clickItem(item, i, e);
    }
  }

  render() {
    const { tag } = this.props;
    return (
      <StyledTag className={this.props.className}>
        {tag.name}
      </StyledTag>
    );
  }
}

Tag.propTypes = {
  /**
   * tags is an array of tag objects
   * that will be displayed in the component
   */
  tag: PropTypes.object,
  /**
   * className to be used for this component
   */
  className: PropTypes.string,
  /**
   * Callback function to be called when an item is clicked
   */
  clickItem: PropTypes.func,
};

Tag.defaultProps = {
  tag: null,
  className: 'LT-Tag-Container',
  clickItem: null,
};

export default Tag;
