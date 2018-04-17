import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MdChatBubble from 'react-icons/lib/md/chat-bubble';
import styled, { css } from 'styled-components';

import { withAutoScroll } from '../../utils/hoc';
import { animate } from '../../utils/style';

import ConversationBox from '../ConversationBox';

const ConversationListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: none;
  background-color: ${(props) => props.theme.palette.common.white};
  height: 50vh;
  min-height: 200px;
  overflow-y: auto;
  ${css`
      animation: ${animate('slide-in')} 3s;
    `};
  `;

const ConversationListSeparator = styled.div`
  background-color: ${(props) => props.theme.palette.common.white};
  font-weight: ${(props) => props.theme.typography.fontWeightThin};
  margin-top: 10px;
  margin-left: 80px;
  padding: 20px 0px;
  color: ${(props) => props.theme.palette.text.primary};
  border-top: 1px solid ${(props) => props.theme.palette.divider};
`;

const NoConversation = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center; /*centers items on the line (the x-axis by default)*/
  align-items: center; /*centers items on the cross-axis (y by default)*/
  flex-direction: column;
`;

const SvgContainer = styled.div`
  margin-bottom: 10px;
`;

const EmptyContainer = styled.div`
  max-width: 80%;
`;

class ConversationList extends Component {
  onClick(item, i, e) {
    if (this.props.clickItem instanceof Function) {
      this.props.clickItem(item, i, e);
    }
  }

  render() {
    return (
      <ConversationListWrapper
        ref={this.props.cmpRef}
        className={this.props.className}
      >
        {this.props.conversations.length > 0 &&
          <div>
            {this.props.conversations.map((conversation, index) =>
              (
                <div
                  role="button"
                  tabIndex={index + 1}
                  key={conversation.id}
                  onClick={this.props.clickItem && ((e) => this.onClick(conversation, index, e))}
                  onKeyPress={this.props.clickItem && ((e) => this.onClick(conversation, index, e))}
                >
                  <ConversationBox
                    conversation={conversation}
                    key={`conversation-${conversation.id}`}
                  />
                </div>
              ))
            }
            <ConversationListSeparator>{this.props.noMoreDataText}</ConversationListSeparator>
          </div>
        }

        {this.props.conversations.length === 0 &&
          <NoConversation>
            <SvgContainer>
              <MdChatBubble color="#e5e9ec" size={40} />
            </SvgContainer>
            <EmptyContainer>
              {this.props.emptyStateText}
            </EmptyContainer>
          </NoConversation>
        }
      </ConversationListWrapper>
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
   * Extra className to style the component
   */
  className: PropTypes.string,
  /**
   * Text to be used to show noMoreDataText
   */
  noMoreDataText: PropTypes.string,
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
  noMoreDataText: '',
};

const autoScrollOptions = { threshold: 300, direction: 'top' };
export default withAutoScroll(autoScrollOptions)(ConversationList);
