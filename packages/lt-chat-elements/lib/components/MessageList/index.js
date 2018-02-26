import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withAutoScroll } from '../../utils/hoc';

import MessageBox from '../MessageBox';
import './index.scss';

class MessageList extends Component {
  onOpen(item, i, e) {
    if (this.props.onOpen instanceof Function) { this.props.onOpen(item, i, e); }
  }

  onDownload(item, i, e) {
    if (this.props.onDownload instanceof Function) { this.props.onDownload(item, i, e); }
  }

  onClick(item, i, e) {
    if (this.props.onClick instanceof Function) { this.props.onClick(item, i, e); }
  }

  onTitleClick(item, i, e) {
    if (this.props.onTitleClick instanceof Function) { this.props.onTitleClick(item, i, e); }
  }

  onForwardClick(item, i, e) {
    if (this.props.onForwardClick instanceof Function) { this.props.onForwardClick(item, i, e); }
  }

  render() {
    return (
      <div ref={this.props.cmpRef} id="messages" className="letstalk-messages-container">
        {
          this.props.messages.map((message, index) =>
            (
              <div className="letstalk-message" key={index}>
                <MessageBox
                  key={`message-${index}`}
                  {...message}
                  onOpen={this.props.onOpen && ((e) => this.onOpen(message, index, e))}
                  onDownload={this.props.onDownload && ((e) => this.onDownload(message, index, e))}
                  onTitleClick={this.props.onDownload && ((e) => this.onTitleClick(message, index, e))}
                  onForwardClick={this.props.onForwardClick && ((e) => this.onForwardClick(message, index, e))}
                  onClick={this.props.onClick && ((e) => this.onClick(message, index, e))}
                  onActionMessageClick={this.props.onActionMessageClick}
                />
              </div>
            ))
        }
      </div>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.array,
  onClick: PropTypes.func,
  onTitleClick: PropTypes.func,
  onForwardClick: PropTypes.func,
  onOpen: PropTypes.func,
  onDownload: PropTypes.func,
  onActionMessageClick: PropTypes.func,
  cmpRef: PropTypes.func,
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
};

const autoScrollOptions = { threshold: 300, direction: 'bottom' };
export default withAutoScroll(autoScrollOptions)(MessageList);
