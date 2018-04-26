import React, { Component } from 'react';

class Thumbnail extends Component {
  render() {
    const { style, ...props } = this.props;
    return (
      <div
        style={{
          backgroundImage: `url(${this.props['@id']})`,
          backgroundSize: 'cover',
          ...style,
        }}
        {...props}
      />
    );
  }
}

export default Thumbnail;
