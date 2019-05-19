import React from 'react';

class ErrorBoundary extends React.Component {
  state = {
    error: null,
    errorInfo: null
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ error, errorInfo });
  }

  render(): any {
    const { errorInfo } = this.state;
    if (errorInfo) {
      return (
        <div>
          <h1>Une erreur est survenue.</h1>
        </div>
      )
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;