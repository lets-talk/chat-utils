import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withAutoScroll } from '../../utils/hoc';

const StyledMessageListContainer = styled.div`
  max-height: 100vh;
  background-color: ${(props) => props.theme.palette.common.white};
  overflow-y: auto;
  padding: 10px;
`;

class MessageList extends Component {
  onOpen(item, i, e) {
    // TODO change for this.props.onOpen instanceof Function
    // When thre is a jest fix to this bug: https://github.com/facebook/jest/issues/6329
    if (typeof this.props.onOpen === 'function') {
      this.props.onOpen(item, i, e);
    }
  }

  onDownload(item, i, e) {
    // TODO change for this.props.onDownload instanceof Function
    // When thre is a jest fix to this bug: https://github.com/facebook/jest/issues/6329
    if (typeof this.props.onDownload === 'function') {
      this.props.onDownload(item, i, e);
    }
  }

  onClick(item, i, e) {
    // TODO change for this.props.onDownload instanceof Function
    // When thre is a jest fix to this bug: https://github.com/facebook/jest/issues/6329
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(item, i, e);
    }
  }

  onTitleClick(item, i, e) {
    // TODO change for this.props.onDownload instanceof Function
    // When thre is a jest fix to this bug: https://github.com/facebook/jest/issues/6329
    if (typeof this.props.onTitleClick === 'function') {
      this.props.onTitleClick(item, i, e);
    }
  }

  onForwardClick(item, i, e) {
    if (typeof this.props.onForwardClick === 'function') {
      this.props.onForwardClick(item, i, e);
    }
  }

  render() {
    const {
      cmpRef, className,
    } = this.props;
    return (
      <StyledMessageListContainer
        innerRef={cmpRef}
        className={className}
        id="messages"
      >
        { this.props.children }
      </StyledMessageListContainer>
    );
  }
}

MessageList.propTypes = {
  children: PropTypes.array,
  onClick: PropTypes.func,
  onTitleClick: PropTypes.func,
  onForwardClick: PropTypes.func,
  onOpen: PropTypes.func,
  onDownload: PropTypes.func,
  cmpRef: PropTypes.func,
  className: PropTypes.string,
};

MessageList.defaultProps = {
  onClick: null,
  onTitleClick: null,
  onForwardClick: null,
  onOpen: null,
  onDownload: null,
  cmpRef: null,
  className: 'LT-MessageList-Container',
};

const autoScrollOptions = { threshold: 300, direction: 'bottom' };
export default withAutoScroll(autoScrollOptions)(MessageList);
