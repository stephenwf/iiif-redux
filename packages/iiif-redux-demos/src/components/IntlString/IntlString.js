/**
 * Intl string
 *
 * This will be better in the future. It will use context API to choose
 * language and render.
 */
import React, { Component } from 'react';

class IntlString extends Component {
  render() {
    const { children } = this.props;
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: children && children[0] ? children[0]['@value'] || '' : '',
        }}
      />
    );
  }
}
export default IntlString;
