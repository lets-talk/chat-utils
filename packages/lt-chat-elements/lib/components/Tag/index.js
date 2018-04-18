import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTag = styled.span`
  color: ${(props) => props.theme.typography.sizes.caption.normal.dark.primary.color};
  font-size: ${(props) => props.theme.typography.sizes.caption.normal.dark.primary.fontSize};
  font-weight: ${(props) => props.theme.typography.sizes.caption.normal.dark.primary.fontWeight};
  background-color: ${(props) => props.theme.palette.background.secondary};

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
      <StyledTag>
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
   * Callback function to be called when an item is clicked
   */
  clickItem: PropTypes.func,
};

Tag.defaultProps = {
  tag: null,
  clickItem: null,
};

export default Tag;
