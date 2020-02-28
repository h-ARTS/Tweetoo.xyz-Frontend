import React, { Component } from 'react';

export class ErrorCatcher extends Component {
  state = {
    hasError: false
  };

  static getDerivedStateFromError(error) {
    return {
      hasError: true
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary: ', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p> Something went wrong! </p>;
    }

    return this.props.children;
  }
}

export default ErrorCatcher;
