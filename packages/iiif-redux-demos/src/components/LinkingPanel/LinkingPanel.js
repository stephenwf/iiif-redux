import React, { Component } from 'react';
import { Row, Col, Card, Layout, List, Badge } from 'antd';
import IntlString from '../IntlString/IntlString';

class LinkingPanel extends Component {
  render() {
    const {
      // Multiple
      seeAlso = [],
      service = [],
      related = [],
      rendering = [],
      // Single
      within = [],
      startCanvas,
    } = this.props;

    console.warn('===>', seeAlso);

    const dataSource = [
      seeAlso && seeAlso.length
        ? {
            label: 'See also links',
            value: seeAlso.filter(e => e).map((seeAlsoLink, key) => (
              <li key={key}>
                <a href={seeAlsoLink['@id']} target="_blank">
                  {seeAlsoLink.label ? (
                    <IntlString>{seeAlsoLink.label}</IntlString>
                  ) : (
                    seeAlsoLink['@id']
                  )}
                </a>
              </li>
            )),
          }
        : null,
      service && service.length
        ? {
            label: 'Services',
            value: service.filter(e => e).map((serviceLink, key) => (
              <li key={key}>
                <a href={serviceLink['@id']} target="_blank">
                  {serviceLink.label ? (
                    <IntlString>{serviceLink.label}</IntlString>
                  ) : (
                    serviceLink['@id']
                  )}
                </a>
              </li>
            )),
          }
        : null,
      related && related.length
        ? {
            label: 'Related',
            value: related.filter(e => e).map((relatedLink, key) => (
              <li key={key}>
                <a href={relatedLink['@id']} target="_blank">
                  {relatedLink.label ? (
                    <IntlString>{relatedLink.label}</IntlString>
                  ) : (
                    relatedLink['@id']
                  )}
                </a>
              </li>
            )),
          }
        : null,
      rendering && rendering.length
        ? rendering.filter(e => e).map((renderingLink, key) => (
            <li key={key}>
              <a href={renderingLink['@id']} target="_blank">
                {renderingLink.label ? (
                  <IntlString>{renderingLink.label}</IntlString>
                ) : (
                  renderingLink['@id']
                )}
              </a>
            </li>
          ))
        : null,
      within && within.length
        ? {
            label: 'Within',
            value: within.filter(e => e).map((withinLink, key) => (
              <li key={key}>
                <a href={withinLink['@id']} target="_blank">
                  {withinLink.label ? (
                    <IntlString>{withinLink.label}</IntlString>
                  ) : (
                    withinLink['@id']
                  )}
                </a>
              </li>
            )),
          }
        : null,
      startCanvas
        ? {
            label: 'Start canvas',
            value: (
              <a href={startCanvas['@id']} target="_blank">
                {<IntlString>{startCanvas.label}</IntlString> ||
                  startCanvas['@id']}
              </a>
            ),
          }
        : null,
    ].filter(e => e);

    if (!dataSource.length) {
      return null;
    }

    return (
      <div>
        <h3>Linking</h3>
        <List
          style={{ background: '#fff', marginBottom: 20 }}
          size="large"
          bordered
          dataSource={dataSource}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.label}
                description={<ul>{item.value}</ul>}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default LinkingPanel;
