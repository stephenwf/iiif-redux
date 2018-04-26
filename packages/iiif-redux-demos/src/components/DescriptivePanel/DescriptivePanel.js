import React, { Component } from 'react';
import IntlString from '../IntlString/IntlString';
import { List, Badge } from 'antd';

const Muted = ({ children }) => (
  <span style={{ color: '#999' }}>{children}</span>
);

class DescriptivePanel extends Component {
  render() {
    const {
      label,
      description,
      metadata,
      attribution,
      logo,
      license,
      thumbnail,
    } = this.props;

    const data = [
      { title: 'label', value: <IntlString>{label}</IntlString> },
      { title: 'description', value: <IntlString>{description}</IntlString> },
      { title: 'attribution', value: <IntlString>{attribution}</IntlString> },
      {
        title: 'license',
        value: license ? <a href={license}>{license}</a> : null,
      },
      {
        title: 'logo',
        value: logo ? (
          <img
            style={{ maxWidth: '100%' }}
            src={logo['@id'] ? logo['@id'] : logo}
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
            src={thumbnail['@id'] ? thumbnail['@id'] : thumbnail}
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
    ];

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
