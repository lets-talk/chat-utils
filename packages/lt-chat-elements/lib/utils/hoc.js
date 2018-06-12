/* eslint-disable  */
import React, { Component } from 'react';

const withAutoScroll = ({ direction, threshold, lockable }) => (WrappedComponent) => class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollBottom: 0,
    };
    this.loadRef = this.loadRef.bind(this);
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

    if (threshold === '100%' ||
      ((direction === 'bottom' && bottom > threshold) ||
       (direction === 'top' && bottom < threshold)
      )
    ) {
      if (direction === 'bottom') {
        // scroll to bottom
        e.scrollTop = e.scrollHeight;
      } else {
        // scroll to top
        e.scrollTop = 0;
      }
    } else if (lockable === true) {
      e.scrollTop = e.scrollHeight - e.offsetHeight - this.state.scrollBottom;
    }
  }

  getBottom(e) {
    return e.scrollHeight - e.scrollTop - e.offsetHeight;
  }

  loadRef(ref) {
    this.mlistRef = ref;
    if (this.props.cmpRef) {
      this.props.cmpRef(ref);
    }
  }

  render() {
    return (
      <WrappedComponent
        cmpRef={(el) => this.loadRef(el)}
        {...this.props}
      />
    );
  }
};

export {
  withAutoScroll,
};
