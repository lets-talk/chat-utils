import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tag from '../Tag';
import './index.scss';

class TagList extends Component {
  onClick(item, i, e) {
    if (this.props.clickItem instanceof Function) {
      this.props.clickItem(item, i, e);
    }
  }

  render() {
    const { tags } = this.props;
    return (
      <div className="cbox-tags">
        {tags.map((tag) => (
          <Tag key={tag.name} tag={tag} onClick={this.onCLick} />
        ))}
      </div>
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
   * Callback function to be called when an item is clicked
   */
  clickItem: PropTypes.func,
};

TagList.defaultProps = {
  tags: [],
  clickItem: null,
};

export default TagList;
