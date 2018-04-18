import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';

import { ellipsis, flexRow, flexColumn } from '../../utils/style';

// Other components used by this component
import TagList from '../TagList';
import Avatar from '../Avatar';

const bgColorChooser = (theme, type) => {
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
  background-color: ${(props) => bgColorChooser(props.theme, props.type)};
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

const TitleDiv = styled.div`
  flex: 1;
  order: 1;

  color: ${(props) => props.theme.typography.sizes.body.normal.dark.primary.color};
  font-size: ${(props) => props.theme.typography.sizes.body.normal.dark.primary.fontSize};
  font-weight: ${(props) => props.theme.typography.sizes.body.normal.dark.primary.fontWeight};
  ${ellipsis('100%')}
`;

const SubTitleDiv = styled.div`
  flex: 1;
  order: 1;

  color: ${(props) => props.theme.typography.sizes.footnote.normal.dark.secondary.color};
  font-size: ${(props) => props.theme.typography.sizes.footnote.normal.dark.secondary.fontSize};
  font-weight: ${(props) => props.theme.typography.sizes.footnote.normal.dark.secondary.fontWeight};
  ${ellipsis('100%')}
`;

const TimeInfoDiv = styled.div`
  display: flex;
  align-items: center;
  order: 2;

  color: ${(props) => props.theme.typography.sizes.caption.normal.dark.secondary.color};
  font-size: ${(props) => props.theme.typography.sizes.caption.normal.dark.secondary.fontSize};
  font-weight: ${(props) => props.theme.typography.sizes.caption.normal.dark.secondary.fontWeight};

  div {
    display: inline-block;
    text-align: right;
    font-size: ${(props) => props.theme.typography.sizes.small.normal.dark.fontSize};
    position: relative;
    color: ${(props) =>
    (props.readed && props.theme.palette.text.primary)
      || (!props.readed && props.theme.typography.sizes.caption.normal.accent.color)};
  }
`;

const CircleDiv = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 3px;
  background-color: ${(props) => props.theme.palette.background.primary};
`;

const ConversationBox = (props) => {
  const { conversation, onClickAction } = props;
  const tags = conversation.tags ? conversation.tags : [];
  const lastMessageType = conversation.last_message.type ? conversation.last_message.type : '';
  const lastMessageReaded = conversation.last_message.readed;
  const timeAgo = moment(conversation.last_message.created_at).fromNow(true);

  return (
    <ConversationBoxWrapper
      className={props.className}
      type={lastMessageType}
      onClick={onClickAction}
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
          <TitleDiv>{conversation.client.name}</TitleDiv>
          <TimeInfoDiv readed={lastMessageReaded}>{!lastMessageReaded && <CircleDiv>&nbsp;</CircleDiv>}
            <div>{timeAgo}</div>
          </TimeInfoDiv>
        </CBoxColumn>

        <CBoxRow>
          <CBoxColumn>
            <SubTitleDiv>{conversation.last_message.content}</SubTitleDiv>
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
  className: 'LT-ConversationBox-Wrapper',
};

export default ConversationBox;
