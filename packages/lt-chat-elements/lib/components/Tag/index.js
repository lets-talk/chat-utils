import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

class TagList extends Component {
  onClick(item, i, e) {
    if (this.props.clickItem instanceof Function) {
      this.props.clickItem(item, i, e);
    }
  }

  render() {
    const { tag } = this.props;
    return (
      <span className="cbox-tag">
        {tag.name}
      </span>
    );
  }
}

TagList.propTypes = {
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

TagList.defaultProps = {
  tag: null,
  clickItem: null,
};

export default TagList;
