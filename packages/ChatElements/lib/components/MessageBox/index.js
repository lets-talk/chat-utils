import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

import FileMessage from '../FileMessage/FileMessage';
import SystemMessage from '../SystemMessage/SystemMessage';

import Avatar from '../Avatar/Avatar';

import FaForward from 'react-icons/lib/fa/mail-forward';

import IoDoneAll from 'react-icons/lib/io/android-done-all';
import MdIosTime from 'react-icons/lib/md/access-time';
import MdCheck from 'react-icons/lib/md/check';

const moment = require('moment');

const classNames = require('classnames');

const MessageBox = (props) => {
  const positionCls = classNames('letstalk-mbox', { 'letstalk-mbox-right': props.position === 'right' });
  const thatAbsoluteTime = props.type !== 'text' && props.type !== 'file' && !(props.type === 'location' && props.text);
  return (
    <div
      role="button"
      tabIndex="-3"
      className={classNames('letstalk-container-mbox', props.className)}
      onClick={props.onClick}
      onKeyPress={props.onClick}
    >
      {
        props.avatar &&
        <div
          className={classNames(
            'letstalk-mbox-avatar-container',
            { 'letstalk-mbox-avatar-container-left': props.position === 'left' },
            { 'letstalk-mbox-avatar-container-right': props.position === 'right' }
          )}
        >
          <Avatar
            src={props.avatar}
            withStatus={false}
            size="xsmall"
            status="online"
          />
        </div>
      }
      {
        props.renderAddCmp instanceof Function &&
                    props.renderAddCmp()
      }
      {
        props.type === 'system' ?
          <SystemMessage
            text={props.text}
          />
          :
          <div
            className={classNames(
              positionCls,
              { 'letstalk-mbox--clear-padding': thatAbsoluteTime },
              { 'letstalk-mbox--clear-notch': !props.notch }
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
                    style={props.titleColor && { color: props.titleColor }}
                    onClick={props.onTitleClick}
                    onKeyPress={props.onTitleClick}
                    className={classNames('letstalk-mbox-title', {
                      'letstalk-mbox-title--clear': props.type === 'text',
                    })}
                  >
                    {
                      props.title &&
                      <span>{props.title}</span>
                    }
                  </div>
              }

              {
                props.type === 'text' &&
                  <div className="letstalk-mbox-text">
                    {props.text}
                  </div>
              }

              {
                props.type === 'file' &&
                  <FileMessage
                    onOpen={props.onOpen}
                    onDownload={props.onDownload}
                    data={props.data}
                    text={props.text}
                  />
              }

              <div className={classNames('letstalk-mbox-time', { 'letstalk-mbox-time-block': thatAbsoluteTime })}>
                {
                  props.date &&
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
            </div>
          </div>
      }
    </div>
  );
};

MessageBox.propTypes = {
  position: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  titleColor: PropTypes.string,
  onTitleClick: PropTypes.func,
  onForwardClick: PropTypes.func,
  date: PropTypes.date,
  data: PropTypes.object,
  onClick: PropTypes.func,
  onOpen: PropTypes.func,
  onDownload: PropTypes.func,
  forwarded: PropTypes.bool,
  status: PropTypes.bool,
  dateString: PropTypes.string,
  avatar: PropTypes.object,
  renderAddCmp: PropTypes.object,
};

MessageBox.defaultProps = {
  position: 'left',
  type: 'text',
  text: '',
  title: null,
  titleColor: null,
  onTitleClick: null,
  onForwardClick: null,
  date: new Date(),
  data: {},
  onClick: null,
  onOpen: null,
  onDownload: null,
  forwarded: false,
  status: null,
  dateString: null,
  avatar: null,
  renderAddCmp: null,
};


export default MessageBox;
