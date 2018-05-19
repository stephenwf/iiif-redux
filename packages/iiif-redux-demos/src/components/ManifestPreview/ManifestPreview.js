import React, { Component } from 'react';
import { connect } from 'react-redux';
import { manifestByIdSelector } from 'iiif-redux/es/api/manifest';
import IntlString from '../IntlString/IntlString';
import { Card } from 'antd';
import Thumbnail from '../Thumbnail/Thumbnail';

class ManifestPreview extends Component {
  render() {
    const { id, label, thumbnail, onClick } = this.props;
    return (
      <div>
        <Card
          onClick={() => onClick(id)}
          style={{ margin: 15 }}
          title={<IntlString>{label}</IntlString>}
          cover={
            thumbnail ? (
              <Thumbnail {...thumbnail} style={{ minHeight: 400 }} />
            ) : null
          }
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
    thumbnail: api.getThumbnail,
  }))
)(ManifestPreview);
