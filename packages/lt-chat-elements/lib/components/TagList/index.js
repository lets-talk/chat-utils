import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Tag from '../Tag';

const StyledTagListContainer = styled.div`
  order: 2;
  margin: 5px;
`;

class TagList extends Component {
  onClick(item, i, e) {
    if (this.props.clickItem instanceof Function) {
      this.props.clickItem(item, i, e);
    }
  }

  render() {
    const { tags } = this.props;
    return (
      <StyledTagListContainer>
        {tags.map((tag) => (
          <Tag key={tag.name} tag={tag} onClick={this.onCLick} />
        ))}
      </StyledTagListContainer>
    );
  }
}

TagList.propTypes = {
  /**
   * tags is an array of tag objects
   * that will be displayed in the component
   */
  tags: PropTypes.array,
  /**
   * ClassName to add to this component
   */
  /* eslint-disable react/no-unused-prop-types */
  className: PropTypes.string,
  /**
   * Callback function to be called when an item is clicked
   */
  clickItem: PropTypes.func,
};

TagList.defaultProps = {
  tags: [],
  className: 'LT-TagList-Container',
  clickItem: null,
};

export default TagList;
