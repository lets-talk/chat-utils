import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MessagePropType } from '../../utils/types';
import { withAutoScroll } from '../../utils/hoc';

import MessageBox from '../MessageBox';

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
      cmpRef, className, messages, onOpen, onDownload, onTitleClick, onForwardClick, onClick, onActionMessageClick,
    } = this.props;
    return (
      <StyledMessageListContainer
        innerRef={cmpRef}
        className={className}
        id="messages"
      >
        {
          messages.map((message, index) =>
            (
              <MessageBox
                key={`message-${message.id}`}
                message={message}
                onOpen={onOpen && ((e) => this.onOpen(message, index, e))}
                onDownload={onDownload && ((e) => this.onDownload(message, index, e))}
                onTitleClick={onTitleClick && ((e) => this.onTitleClick(message, index, e))}
                onForwardClick={onForwardClick && ((e) => this.onForwardClick(message, index, e))}
                onClick={onClick && ((e) => this.onClick(message, index, e))}
                onActionMessageClick={onActionMessageClick}
              />
            ))
        }
      </StyledMessageListContainer>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(MessagePropType),
  onClick: PropTypes.func,
  onTitleClick: PropTypes.func,
  onForwardClick: PropTypes.func,
  onOpen: PropTypes.func,
  onDownload: PropTypes.func,
  onActionMessageClick: PropTypes.func,
  cmpRef: PropTypes.func,
  className: PropTypes.string,
};

MessageList.defaultProps = {
  messages: [],
  onClick: null,
  onTitleClick: null,
  onForwardClick: null,
  onOpen: null,
  onDownload: null,
  onActionMessageClick: null,
  cmpRef: null,
  className: 'LT-MessageList-Container',
};

MessageList.displayName = 'MessageList';

const autoScrollOptions = { threshold: 300, direction: 'bottom' };
export default withAutoScroll(autoScrollOptions)(MessageList);
