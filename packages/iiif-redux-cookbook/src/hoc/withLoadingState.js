import React, { Component } from 'react';

export default WrappedComponent => {
  return class extends Component {
    componentWillMount() {
      this.props.iiifResourceRequestUnknown(this.props.id);
    }

    render() {
      const { error, fetched, ...props } = this.props;

      if (error) {
        return <div>Loading...</div>;
      }

      if (fetched === false) {
        return <div>Loading...</div>;
      }

      return <WrappedComponent {...props} />;
    }
  };
};
