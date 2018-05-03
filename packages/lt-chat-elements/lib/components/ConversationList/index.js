import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MdChatBubble from 'react-icons/lib/md/chat-bubble';
import styled, { css } from 'styled-components';

import { withAutoScroll } from '../../utils/hoc';
import { animate, textColor } from '../../utils/style';

import ConversationBox from '../ConversationBox';

const StyledConversationListWrapper = styled.div`
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

const StyledConversationListSeparator = styled.div`
  margin-top: 10px;
  margin-left: 80px;
  padding: 20px 0px;
  
  color: ${(props) => textColor(props.theme, 'dark', 'secondary')};
  font-size: ${(props) => props.theme.typography.classes.small.fontSize};
  line-height: ${(props) => props.theme.typography.classes.small.lineHeight};
  font-weight: ${(props) => props.theme.typography.weights.fontWeightMedium};
  border-top: 1px solid ${(props) => props.theme.palette.divider};
`;

const StyledConversationBoxContainer = styled.div`
  // transition: box-shadow .3s;
  // &:hover {
  //   box-shadow: ${(props) => props.theme.shadows['2p']};
  // }
`;

const StyledNoConversation = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center; /*centers items on the line (the x-axis by default)*/
  align-items: center; /*centers items on the cross-axis (y by default)*/
  flex-direction: column;

  color: ${(props) => textColor(props.theme, 'dark', 'secondary')};
  font-size: ${(props) => props.theme.typography.classes.body.fontSize};
  line-height: ${(props) => props.theme.typography.classes.body.lineHeight};
  font-weight: ${(props) => props.theme.typography.weights.fontWeightMedium};
`;

const StyledSvgContainer = styled.div`
  margin-bottom: 10px;
`;

const StyledEmptyContainer = styled.div`
  max-width: 80%;

  color: ${(props) => textColor(props.theme, 'dark', 'disabled')};
  font-size: ${(props) => props.theme.typography.classes.footnote.fontSize};
  line-height: ${(props) => props.theme.typography.classes.footnote.lineHeight};
  font-weight: ${(props) => props.theme.typography.weights.fontWeightMedium};
`;

class ConversationList extends Component {
  onClick(item, i, e) {
    if (this.props.clickItem instanceof Function) {
      this.props.clickItem(item, i, e);
    }
  }

  render() {
    return (
      <StyledConversationListWrapper
        innerRef={this.props.cmpRef}
        className={this.props.className}
      >
        {this.props.conversations.length > 0 &&
          <div>
            {this.props.conversations.map((conversation, index) =>
              (
                <StyledConversationBoxContainer
                  key={conversation.id}
                  onClick={this.props.clickItem && ((e) => this.onClick(conversation, index, e))}
                  onKeyPress={this.props.clickItem && ((e) => this.onClick(conversation, index, e))}
                >
                  <ConversationBox
                    conversation={conversation}
                    key={`conversation-${conversation.id}`}
                  />
                </StyledConversationBoxContainer>
              ))
            }
            <StyledConversationListSeparator>{this.props.noMoreDataText}</StyledConversationListSeparator>
          </div>
        }

        {this.props.conversations.length === 0 &&
          <StyledNoConversation>
            <StyledSvgContainer>
              <MdChatBubble color="#e5e9ec" size={40} />
            </StyledSvgContainer>
            <StyledEmptyContainer>
              {this.props.emptyStateText}
            </StyledEmptyContainer>
          </StyledNoConversation>
        }
      </StyledConversationListWrapper>
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
