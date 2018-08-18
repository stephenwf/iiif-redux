import React, { Component } from 'react';

class Thumbnail extends Component {
  render() {
    const { style, data, ...props } = this.props;

    if (typeof data === 'string') {
      return (
        <div
          style={{
            backgroundImage: `url(${data})`,
            backgroundSize: 'cover',
            ...style,
          }}
          {...props}
        />
      );
    }
    return (
      <div
        style={{
          backgroundImage: `url(${data['@id'] || data.id})`,
          backgroundSize: 'cover',
          ...style,
        }}
        {...props}
      />
    );
  }
}

export default Thumbnail;
