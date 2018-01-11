/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';

const withInfiniteScroll = (WrappedComponent) =>
  class WithInfiniteScroll extends Component {
    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll() {
      if (
        (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
        this.props.list.length
      ) {
        this.props.onPaginatedSearch();
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

const withScrollWatch = (WrappedComponent) => class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0, y: 0,
    };
  }


  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    this.setState({
      x: window.scrollX,
      y: window.scrollY,
    });
  }

  render() {
    return <WrappedComponent {...this.state} {...this.props} />;
  }
};

const withLoading = (WrappedComponent) => (props) =>
  (
    <div>
      <WrappedComponent {...props} />
      <div className="interactions">
        {props.isLoading && <span>Loading...</span>}
      </div>
    </div>
  );

const withPaginated = (WrappedComponent) => (props) =>
  (
    <div>
      <WrappedComponent {...props} />
      <div className="interactions">
        {
          (props.page !== null && !props.isLoading) &&
          <button
            type="button"
            onClick={props.onPaginatedSearch}
          >
            More
          </button>
        }
      </div>
    </div>
  );

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
      ((direction === 'bottom' && bottom < threshold) ||
       (direction === 'top' && bottom > threshold)
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
    if (this.props.cmpRef) { this.props.cmpRef(ref); }
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
  withInfiniteScroll,
  withScrollWatch,
  withLoading,
  withPaginated,
  withAutoScroll,
};
