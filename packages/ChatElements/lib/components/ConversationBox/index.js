import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

// Other components used by this component
import Avatar from '../Avatar';

// Component styles
import './index.scss';

const ConversationBox = (props) => {
  const { conversation } = props;
  const tags = conversation.tags ? [conversation.tags[0]] : [];
  const lastMessageType = conversation.last_message.type ? conversation.last_message.type : '';
  const lastMessageReaded = conversation.last_message.readed;
  const timeAgo = moment(conversation.last_message.created_at).fromNow(true);

  return (
    <div
      role="button"
      tabIndex="-3"
      className={classNames(
        'letstalk-cbox', lastMessageType, props.className,
        {
          'not-read': !lastMessageReaded,
        }
      )}
      onClick={props.onClick}
      onKeyPress={props.onClick}
    >
      {
        conversation.client.avatar &&
        <div
          className={classNames('cbox-left', 'letstalk-cbox-avatar-container')}
        >
          <Avatar
            src={conversation.client.avatar}
            withStatus={false}
            size="small"
            status="online"
          />
        </div>
      }

      <div
        className={classNames('cbox-right', 'cbox-row')}
      >
        <div className="cbox-column">
          <div className="cbox-title">{conversation.client.name}</div>
          <div className="cbox-time-info-col">{!lastMessageReaded && <div className="cbox-circle">&nbsp;</div>}
            <div className="cbox-time">{timeAgo}</div>
          </div>
        </div>

        <div className="cbox-row">
          <div className="cbox-column">
            <div className="cbox-subtitle">{conversation.last_message.content}</div>
            <div className="cbox-tags">
              {tags.map((tag, index) => (
                <span className="cbox-tag">
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

ConversationBox.propTypes = {
  conversation: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

ConversationBox.defaultProps = {
  onClick: null,
};


export default ConversationBox;
