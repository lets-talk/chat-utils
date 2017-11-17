import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import ConversationBox from '../ConversationBox';
import './index.scss';


class ConversationList extends Component {
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
    if (this.props.onOpen instanceof Function) {
      this.props.onOpen(item, i, e);
    }
  }

  onDownload(item, i, e) {
    if (this.props.onDownload instanceof Function) {
      this.props.onDownload(item, i, e);
    }
  }

  onClick(item, i, e) {
    if (this.props.onClick instanceof Function) {
      this.props.onClick(item, i, e);
    }
  }

  onTitleClick(item, i, e) {
    if (this.props.onTitleClick instanceof Function) {
      this.props.onTitleClick(item, i, e);
    }
  }

  onForwardClick(item, i, e) {
    if (this.props.onForwardClick instanceof Function) {
      this.props.onForwardClick(item, i, e);
    }
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
      <div id="conversations" className="letstalk-conversations-container">
        {
          this.props.conversations.map((conversation, index) =>
            (
              <div className="letstalk-conversation-container" key={index}>
                <ConversationBox
                  conversation={conversation}
                  key={`conversation-${index}`}
                  onClick={this.props.onClick && ((e) => this.onClick(conversation, index, e))}
                />
              </div>
            ))
        }
      </div>
    );
  }
}

ConversationList.propTypes = {
  conversations: PropTypes.array,
  onClick: PropTypes.func,
  toBottomHeight: PropTypes.number,
};

ConversationList.defaultProps = {
  conversations: [],
  onClick: null,
  toBottomHeight: 300,
};

export default ConversationList;
