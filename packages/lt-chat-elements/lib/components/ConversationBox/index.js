import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';

import { ellipsis, flexRow, flexColumn, textColor } from '../../utils/style';

// Other components used by this component
import TagList from '../TagList';
import Avatar from '../Avatar';

const bgColorChooser = (props) => {
  const { theme, type } = props;
  if (type === 'internal') return theme.components.conversationBox.internalBackgroundColor;
  else if (type === 'important') return theme.components.conversationBox.importantBackgroundColor;

  return theme.palette.common.white;
};

const ConversationBoxWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex: 1;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: flex-start;
  min-height: 50px;
  background-color: ${(props) => bgColorChooser(props)};
`;


const CBoxRow = styled.div`
  ${flexRow()}
`;

const CBoxColumn = styled.div`
  ${flexColumn()}
`;

const CBoxRowLeft = styled.div`
  min-width: 50px;
  order: 1;
  padding: 10px;
`;

const CBoxRowRight = styled.div`
  ${flexRow()}
  position: relative;
  width: calc(100% - 80px);
  flex-basis: 1;
  order: 2;
  padding: 10px;
  padding-left: 0px;
`;

const StyledTitleDiv = styled.div`
  flex: 1;
  order: 1

  color: ${(props) => textColor(props.theme, 'light', 'primary')};
  font-size: ${(props) => props.theme.typography.classes.body.fontSize};
  line-height: ${(props) => props.theme.typography.classes.body.lineHeight};
  font-weight: ${(props) => props.theme.typography.weights.fontWeightBold};

  ${ellipsis('100%')}
`;

const StyledSubTitleDiv = styled.div`
  flex: 1;
  order: 1;

  color: ${(props) => textColor(props.theme, 'light', 'secondary')};
  font-size: ${(props) => props.theme.typography.classes.footnote.fontSize};
  line-height: ${(props) => props.theme.typography.classes.footnote.lineHeight};
  font-weight: ${(props) => props.theme.typography.weights.fontWeightMedium};

  ${ellipsis('100%')}
`;

const StyledTimeInfoDiv = styled.div`
  display: flex;
  align-items: center;
  order: 2;

  color: ${(props) => textColor(props.theme, 'dark', 'secondary')};
  font-size: ${(props) => props.theme.typography.classes.caption.fontSize};
  line-height: ${(props) => props.theme.typography.classes.caption.lineHeight};
  font-weight: ${(props) => props.theme.typography.weights.fontWeightMedium};

  div {
    display: inline-block;
    text-align: right;
    font-size: ${(props) => props.theme.typography.classes.small.fontSize};
    position: relative;
    color: ${(props) =>
    (props.readed && props.theme.palette.colors.primary.base)
      || (!props.readed && props.theme.palette.colors.accent.base)};
  }
`;

const CircleDiv = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 3px;
  background-color: ${(props) => props.theme.palette.colors.accent.base};
`;

const ConversationBox = (props) => {
  const { conversation, onClickAction } = props;
  const tags = conversation.tags ? conversation.tags : [];
  const lastMessageType = conversation.last_message.type ? conversation.last_message.type : '';
  const lastMessageReaded = conversation.last_message.status === 'read';
  const timeAgo = moment(conversation.last_message.created_at).fromNow(true);

  return (
    <ConversationBoxWrapper
      className={props.className}
      onClick={onClickAction}
      type={lastMessageType}
      readed={lastMessageReaded}
    >
      {
        conversation.client.avatar &&
        <CBoxRowLeft>
          <Avatar
            src={conversation.client.avatar}
            withStatus={false}
            size="small"
            status="online"
          />
        </CBoxRowLeft>
      }

      <CBoxRowRight>
        <CBoxColumn>
          <StyledTitleDiv>{conversation.client.name}</StyledTitleDiv>
          <StyledTimeInfoDiv readed={lastMessageReaded}>{!lastMessageReaded && <CircleDiv>&nbsp;</CircleDiv>}
            <div>{timeAgo}</div>
          </StyledTimeInfoDiv>
        </CBoxColumn>

        <CBoxRow>
          <CBoxColumn>
            <StyledSubTitleDiv>{conversation.last_message.content}</StyledSubTitleDiv>
            <TagList tags={tags} />
          </CBoxColumn>
        </CBoxRow>
      </CBoxRowRight>

    </ConversationBoxWrapper>
  );
};

ConversationBox.propTypes = {
  /**
   * The Conversation object
   */
  conversation: PropTypes.object.isRequired,
  /**
   * Function callback called when clicking on an item
   */
  onClickAction: PropTypes.func,
  /**
   * Extra className to style the component
   */
  className: PropTypes.string,
};

ConversationBox.defaultProps = {
  onClickAction: null,
  className: 'LT-ConversationBox-Container',
};

export default ConversationBox;
