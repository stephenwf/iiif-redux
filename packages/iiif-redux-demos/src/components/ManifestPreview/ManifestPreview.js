import React, { Component } from 'react';
import { connect } from 'react-redux';
import { manifestByIdSelector } from 'iiif-redux/es/api/manifest';
import IntlString from '../IntlString/IntlString';
import { Card } from 'antd';

class ManifestPreview extends Component {
  render() {
    const { id, label, onClick } = this.props;
    return (
      <div>
        <Card
          onClick={() => onClick(id)}
          style={{ margin: 15 }}
          title={<IntlString>{label}</IntlString>}
        >
          {id}
        </Card>
      </div>
    );
  }
}

export default connect(
  manifestByIdSelector(api => ({
    id: api.getId,
    label: api.getLabel,
  }))
)(ManifestPreview);
