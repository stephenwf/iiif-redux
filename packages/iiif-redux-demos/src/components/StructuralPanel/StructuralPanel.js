import React, { Component } from 'react';
import { List, Badge } from 'antd';

class StructuralPanel extends Component {
  render() {
    const dataSource = [
      this.props.sequences
        ? {
            label: 'Total sequences',
            value: this.props.sequences.length,
          }
        : null,
      this.props.canvases
        ? {
            label: 'Total canvases',
            value: this.props.canvases.length,
          }
        : null,
      this.props.ranges
        ? {
            label: 'Total ranges',
            value: this.props.ranges.length,
          }
        : null,
      this.props.structures
        ? {
            label: 'Total structures',
            value: this.props.structures.length,
          }
        : null,
      this.props.collections
        ? {
            label: 'Total collections',
            value: this.props.collections.length,
          }
        : null,
      this.props.manifests
        ? {
            label: 'Total manifests',
            value: this.props.manifests.length,
          }
        : null,
      this.props.otherContent
        ? {
            label: 'Total other content lists',
            value: this.props.otherContent.length,
          }
        : null,
    ].filter(e => e);

    return (
      <div>
        <h3>Structural</h3>
        <List
          style={{ background: '#fff', marginBottom: 20 }}
          size="large"
          bordered
          dataSource={dataSource}
          renderItem={item => (
            <List.Item>
              <span style={{ paddingRight: 10 }}>{item.label}</span>
              <Badge
                count={item.value}
                showZero={true}
                style={{ backgroundColor: item.value ? '#52c41a' : null }}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default StructuralPanel;
