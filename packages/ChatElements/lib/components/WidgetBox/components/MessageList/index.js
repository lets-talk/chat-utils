import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import MessageBox from '../../../MessageBox';
import './index.scss';

const scrollToBottom = () => {
  const messagesDiv = document.getElementById('messages');
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollBottom: 0,
    };
  }

  componentWillReceiveProps() {
    if (!this.mlistRef) { return; }
    this.setState({
      scrollBottom: this.getBottom(this.mlistRef),
    });
  }

  componentDidUpdate() {
    const e = this.mlistRef;
    if (!e) { return; }

    const bottom = this.getBottom(e);
    if (this.props.toBottomHeight === '100%' || bottom < this.props.toBottomHeight) {
      // scroll to bottom
      e.scrollTop = e.scrollHeight;
    } else if (this.props.lockable === true) {
      e.scrollTop = e.scrollHeight - e.offsetHeight - this.state.scrollBottom;
    }
  }

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

  getBottom(e) {
    return e.scrollHeight - e.scrollTop - e.offsetHeight;
  }

  // componentDidMount() {
  //   scrollToBottom();
  // }
  //
  // componentDidUpdate() {
  //   scrollToBottom();
  // }

  render() {
    return (
      <div id="messages" className="letstalk-messages-container">
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
  lockable: PropTypes.bool,
  toBottomHeight: PropTypes.number,
};

MessageList.defaultProps = {
  messages: [],
  onClick: null,
  onTitleClick: null,
  onForwardClick: null,
  onOpen: null,
  onDownload: null,
  lockable: false,
  toBottomHeight: 300,
};

export default MessageList;
