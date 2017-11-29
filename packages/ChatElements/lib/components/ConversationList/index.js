import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MdChatBubble from 'react-icons/lib/md/chat-bubble';

import { withAutoScroll } from '../../utils/hoc';

import ConversationBox from '../ConversationBox';
import './index.scss';

class ConversationList extends Component {
  onClick(item, i, e) {
    if (this.props.clickItem instanceof Function) {
      this.props.clickItem(item, i, e);
    }
  }

  render() {
    return (
      <div ref={this.props.cmpRef} id="conversations" className="letstalk-conversations-container">
        {this.props.conversations.length > 0 &&
          <div className="letstalk-conversations-list">
            {this.props.conversations.map((conversation, index) =>
              (
                <div
                  role="button"
                  tabIndex={index + 1}
                  className="letstalk-conversation-container"
                  key={conversation.id}
                  onClick={this.props.clickItem && ((e) => this.onClick(conversation, index, e))}
                  onKeyPress={this.props.clickItem && ((e) => this.onClick(conversation, index, e))}
                >
                  <ConversationBox
                    conversation={conversation}
                    key={`conversation-${index}`}
                  />
                </div>
              ))
            }
            <div className="conversations-list-separator">{this.props.noMoreDataText}</div>
          </div>
        }

        {this.props.conversations.length === 0 &&
          <div className="letstalk-conversations-empty-state-container">
            <div className="svg-container">
              <MdChatBubble color="#e5e9ec" size={40} />
            </div>
            <div className="empty-state">
              {this.props.emptyStateText}
            </div>
          </div>
        }
      </div>
    );
  }
}

ConversationList.propTypes = {
  /**
   * conversations is an array of conversations objects
   * that will be displayed in the component
   */
  conversations: PropTypes.array,
  /**
   * Callback function to be called when an item is clicked
   */
  clickItem: PropTypes.func,
  /**
   * Text to be used when no conversations
   */
  emptyStateText: PropTypes.string,
  /**
   * cmpRef is a function that is called by anyone
   * that needs an instance ref of this component
   */
  cmpRef: PropTypes.func,
};

ConversationList.defaultProps = {
  conversations: [],
  clickItem: null,
  cmpRef: null,
  emptyStateText: '',
};

const autoScrollOptions = { threshold: 300, direction: 'top' };
export default withAutoScroll(autoScrollOptions)(ConversationList);
