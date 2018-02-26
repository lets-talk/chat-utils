import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

// Icons to be used on this component
import FaForward from 'react-icons/lib/fa/mail-forward';
import IoDoneAll from 'react-icons/lib/io/android-done-all';
import MdIosTime from 'react-icons/lib/md/access-time';
import MdCheck from 'react-icons/lib/md/check';

// Constants
import constants from '../../utils/constants';

// Other components used by this component
import FileMessage from '../FileMessage';
import SystemMessage from '../SystemMessage';
import TimeMarkMessage from '../TimeMarkMessage';
import PhotoMessage from '../PhotoMessage';
import Avatar from '../Avatar';
import Loader from '../Loader';
import ActionableMessageBox from '../ActionableMessageBox';

// Component styles
import './index.scss';

const MessageBox = (props) => {
  const { messagesTypes, personTypes } = constants;
  const mboxExtraClasses = classNames('letstalk-mbox', `letstalk-mbox-${props.position}`, {
    'letstalk-mbox-agent': props.person.type === personTypes.AGENT,
    'letstalk-mbox-bot': props.person.type === personTypes.BOT && props.type !== messagesTypes.ACTIONABLE,
    'letstalk-mbox-actionable': props.type === messagesTypes.ACTIONABLE,
  });

  const thatAbsoluteTime = props.type !== messagesTypes.TEXT && props.type !== messagesTypes.TYPING;
  const automaticMessage = () => {
    if (props.type === messagesTypes.SYSTEM) {
      return (<SystemMessage
        text={props.text}
      />);
    } else if (props.type === messagesTypes.TIME) {
      return (<TimeMarkMessage
        text={props.text}
      />);
    }
    return <div />;
  };

  return (
    <div
      role="button"
      tabIndex="-3"
      className={classNames('letstalk-container-mbox', props.className)}
      onClick={props.onClick}
      onKeyPress={props.onClick}
    >
      {
        props.person.avatar && props.type !== messagesTypes.SYSTEM &&
        <div
          className={classNames(
            'letstalk-mbox-avatar-container',
            { 'letstalk-mbox-avatar-container-left': props.position === 'left' },
            { 'letstalk-mbox-avatar-container-right': props.position === 'right' }
          )}
        >
          <Avatar
            src={props.person.avatar}
            withStatus={false}
            size="xsmall"
            status="online"
          />
        </div>
      }
      {
        props.type === messagesTypes.SYSTEM || props.type === messagesTypes.TIME ?
          automaticMessage()
          :
          <div
            className={classNames(
              mboxExtraClasses,
              { 'letstalk-mbox--clear-padding': thatAbsoluteTime },
            )}
          >
            <div className="letstalk-mbox-body">
              {
                props.forwarded === true &&
                  <div
                    role="button"
                    tabIndex="-2"
                    className={classNames(
                      'letstalk-mbox-forward',
                      { 'letstalk-mbox-forward-right': props.position === 'left' },
                      { 'letstalk-mbox-forward-left': props.position === 'right' }
                    )}
                    onClick={props.onForwardClick}
                    onKeyPress={props.onForwardClick}
                  >
                    <FaForward />
                  </div>
              }

              {
                (props.title) &&
                  <div
                    role="button"
                    tabIndex="-1"
                    onClick={props.onTitleClick}
                    onKeyPress={props.onTitleClick}
                    className={classNames('letstalk-mbox-title', {
                      'letstalk-mbox-title--clear': props.type === messagesTypes.TEXT,
                    })}
                  >
                    {
                      props.title &&
                      <span>{props.title}</span>
                    }
                  </div>
              }

              {
                props.type === messagesTypes.TEXT &&
                  <div className={classNames('letstalk-mbox-content', 'letstalk-mbox-text')}>
                    {props.text}
                  </div>
              }

              {
                props.type === messagesTypes.TYPING &&
                  <div className={classNames('letstalk-mbox-content', 'letstalk-mbox-typing')}>
                    <Loader active type="ball-pulse" size="xsmall" color="rgb(113, 131, 150)" />
                  </div>
              }

              {
                props.type === messagesTypes.PHOTO &&
                <PhotoMessage
                  onOpen={props.onOpen}
                  onDownload={props.onDownload}
                  data={props.data}
                  text={props.text}
                />
              }

              {
                props.type === messagesTypes.FILE &&
                  <FileMessage
                    onOpen={props.onOpen}
                    onDownload={props.onDownload}
                    data={props.data}
                    text={props.text}
                  />
              }

              {
                props.type === messagesTypes.ACTIONABLE &&
                  <ActionableMessageBox
                    data={props.data}
                    onClickAction={props.onActionMessageClick}
                  />
              }

              {props.type !== messagesTypes.TYPING && props.type !== messagesTypes.ACTIONABLE &&
                <div className={classNames('letstalk-mbox-time', { 'letstalk-mbox-time-block': thatAbsoluteTime })}>
                  {
                    props.date && (props.type !== messagesTypes.TYPING) &&
                    (
                      props.dateString ||
                        moment(props.date).fromNow()
                    )
                  }
                  {
                    props.status &&
                      <span className="letstalk-mbox-status">
                        {
                          props.status === 'waiting' &&
                          <MdIosTime />
                        }

                        {
                          props.status === 'sent' &&
                          <MdCheck />
                        }

                        {
                          props.status === 'received' &&
                          <IoDoneAll />
                        }

                        {
                          props.status === 'read' &&
                          <IoDoneAll color="#4FC3F7" />
                        }
                      </span>
                  }
                </div>
              }

            </div>
          </div>
      }
    </div>
  );
};

MessageBox.propTypes = {
  /**
   * Position: What side the message is displayed inside the chatbox
   */
  position: PropTypes.string,
  /**
   * Type of Message: Type of the message. Values are defined as constants.
   * The current supported types are: SYSTEM, TEXT, TYPING, TIME, ACTIONABLE, FILE, PHOTO.
   */
  type: PropTypes.string,
  /**
   * Text: Actual message content text.
   */
  text: PropTypes.string,
  /**
   * Title: Message title. Is used to display as a first line. It is also possible to make it clickable
   */
  title: PropTypes.string,
  /**
   * onTitleClick: Handler function to be called when user click on message title
   */
  onTitleClick: PropTypes.func,
  /**
   * onForwardClick: Handler function to be called when user click on forwared message
   */
  onForwardClick: PropTypes.func,
  /**
   * date: Message creation date.
   */
  date: PropTypes.instanceOf(Date),
  /**
   * data: Object with extra data used to display information about the message
   */
  data: PropTypes.object,
  /**
   * onClick: Handler function that is called on message click action
   */
  onClick: PropTypes.func,
  /**
   * onActionMessageClick: Handler function that is called when user click on an item of
   * a message that contains actionable action list
   */
  onActionMessageClick: PropTypes.func,
  /**
   * onOpen: Handler function that is called when user tries to open a File/Photo message type
   */
  onOpen: PropTypes.func,
  /**
  * onDownload: Handler function that is called when user tries to download a File/Photo message type
  */
  onDownload: PropTypes.func,
  /**
  * forwarded: Boolean that indicates if message was forwareded. If this is false (default) onForwardClick
  * handler has no effect at all
  */
  forwarded: PropTypes.bool,
  /**
   * status: Message status. Values are defined as constants.
   * Current supported values are: WAITING, SENT, RECEIVED, READ
   */
  status: PropTypes.string,
  /**
   * dateString: Formated date string to show. This is the default to use.
   * If this is not provided by default to show the time moment(props.date).fromNow() is used.
   */
  dateString: PropTypes.string,
  /**
   * person: Object representing the person that created or submited this message.
   */
  person: PropTypes.object,
  /**
   * className: Extra className to provide to the component in order to style it when used in different contexts.
   */
  className: PropTypes.string,
};

MessageBox.defaultProps = {
  position: 'left',
  type: 'text',
  text: '',
  title: null,
  onTitleClick: null,
  onActionMessageClick: null,
  onForwardClick: null,
  date: new Date(),
  data: {},
  onClick: null,
  onOpen: null,
  onDownload: null,
  forwarded: false,
  status: '',
  dateString: null,
  person: null,
  className: '',
};


export default MessageBox;
