/**
 * Intl string
 *
 * This will be better in the future. It will use context API to choose
 * language and render.
 */
import React, { Component } from 'react';

class IntlString extends Component {
  renderString(str) {
    if (!str) {
      return '';
    }
    if (Array.isArray(str)) {
      return str && str[0] ? str[0]['@value'] || '' : '';
    }
    return str[Object.keys(str)[0]][0] || '';
  }

  render() {
    const { children } = this.props;
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: this.renderString(children),
        }}
      />
    );
  }
}
export default IntlString;
