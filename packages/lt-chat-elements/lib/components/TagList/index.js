import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Tag from '../Tag';

const StyledTagListContainer = styled.div`
  order: 2;
  margin: 5px;
`;

const StyledTagItem = styled.span`
  padding: 2px;
`;

StyledTagListContainer.displayName = 'StyledTagListContainer';

class TagList extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(item, i, e) {
    // TODO change for this.props.clickItem instanceof Function
    // When thre is a jest fix to this bug: https://github.com/facebook/jest/issues/6329
    if (typeof this.props.clickItem === 'function') {
      this.props.clickItem(item, i, e);
    }
  }

  render() {
    const { tags } = this.props;
    return (
      <StyledTagListContainer>
        {tags.map((tag, i) => (
          <StyledTagItem key={tag.name} onClick={(e) => this.onClick(tag, i, e)}>
            <Tag data={tag} />
          </StyledTagItem>
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

TagList.displayName = 'TagList';

export default TagList;
