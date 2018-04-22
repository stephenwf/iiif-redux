/**
 * Intl string
 *
 * This will be better in the future. It will use context API to choose
 * language and render.
 */
import React from 'react';

export default str => {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: str.children ? str.children[0]['@value'] || '' : '',
      }}
    />
  );
};
