import React, { Component } from 'react';
import IntlString from '../IntlString/IntlString';
import { List, Badge } from 'antd';
import CanvasPreview from '../CanvasPreview/CanvasPreview';

const Muted = ({ children }) => (
  <span style={{ color: '#999' }}>{children}</span>
);

class DescriptivePanel extends Component {
  render() {
    const {
      label,
      description,
      summary,
      posterCanvas,
      requiredStatement,
      metadata,
      attribution,
      rights,
      logo,
      license,
      thumbnail,
    } = this.props;

    const data = [
      { title: 'label', value: <IntlString>{label}</IntlString> },
      description
        ? {
            title: 'description',
            value: <IntlString>{description}</IntlString>,
          }
        : null,
      summary
        ? { title: 'summary', value: <IntlString>{summary}</IntlString> }
        : null,
      attribution
        ? {
            title: 'attribution',
            value: <IntlString>{attribution}</IntlString>,
          }
        : null,
      requiredStatement
        ? {
            title: 'requiredStatement',
            value: <IntlString>{requiredStatement}</IntlString>,
          }
        : null,
      {
        title: 'license',
        value: license ? <a href={license}>{license}</a> : null,
      },
      posterCanvas
        ? {
            title: 'poster canvas',
            value: (
              <CanvasPreview
                id={posterCanvas}
                onClick={this.props.selectCanvas}
              />
            ),
          }
        : null,
      rights
        ? {
            title: 'rights',
            value: rights,
          }
        : null,
      {
        title: 'logo',
        value: logo ? (
          <img
            style={{ maxWidth: '100%' }}
            src={
              logo['@id'] || logo.id || (logo[0] && logo[0].id)
                ? logo['@id'] || logo.id || (logo[0] && logo[0].id)
                : logo
            }
          />
        ) : (
          <Muted>no logo</Muted>
        ),
      },
      {
        title: 'thumbnail',
        value: thumbnail ? (
          <img
            style={{ maxWidth: '100%' }}
            src={
              thumbnail['@id'] || thumbnail.id
                ? thumbnail['@id'] || thumbnail.id
                : thumbnail
            }
          />
        ) : (
          <Muted>no thumbnail</Muted>
        ),
      },
      ...(metadata || []).map(metadataItem => ({
        title: metadataItem.label ? (
          <IntlString>{metadataItem.label}</IntlString>
        ) : null,
        value: <IntlString>{metadataItem.value}</IntlString>,
      })),
    ].filter(Boolean);

    return (
      <div>
        <h3>Descriptive</h3>
        <List
          style={{ background: '#fff', marginBottom: 20 }}
          size="large"
          bordered
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta title={item.title} description={item.value} />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default DescriptivePanel;
