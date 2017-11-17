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

  return (
    <div
      role="button"
      tabIndex="-3"
      className={classNames('letstalk-container-cbox', props.className)}
      onClick={props.onClick}
      onKeyPress={props.onClick}
    >
      {
        conversation.client.avatar &&
        <div
          className={classNames('letstalk-cbox-avatar-container')}
        >
          <Avatar
            src={conversation.client.avatar}
            withStatus={false}
            size="xsmall"
            status="online"
          />
        </div>
      }

      <div
        className={classNames('letstalk-cbox')}
      >
        <div className="cbox-title-row">
          {conversation.client.name}
        </div>

        <div className="cbox-subtitle-row">
          {conversation.last_message.content}
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
