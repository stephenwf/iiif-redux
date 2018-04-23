import React, { Component } from 'react';
import { List, Tag } from 'antd';

class TechnicalPanel extends Component {
  render() {
    const {
      id,
      type,
      viewingHint,
      navDate,
      viewingDirection,
      format,
      height,
      width,
    } = this.props;
    const data = [
      { title: 'id', value: id },
      {
        title: 'type',
        value: (
          <Tag color="volcano">
            {type.indexOf('sc:') === 0 ? type.slice(3) : type}
          </Tag>
        ),
      },
      viewingHint
        ? {
            title: 'viewing hint',
            value: <Tag color="gold">{viewingHint}</Tag>,
          }
        : null,
      navDate ? { title: 'nav date', value: navDate } : null,
      viewingDirection
        ? {
            title: 'viewing direction',
            value: <Tag color="green">{viewingDirection}</Tag>,
          }
        : null,
      format
        ? {
            title: 'format',
            value: <Tag color="blue">{format}</Tag>,
          }
        : null,
      height ? { title: 'height', value: `${height}px` } : null,
      width ? { title: 'width', value: `${width}px` } : null,
    ].filter(e => e);

    return (
      <div>
        <h3>Technical</h3>
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

export default TechnicalPanel;
