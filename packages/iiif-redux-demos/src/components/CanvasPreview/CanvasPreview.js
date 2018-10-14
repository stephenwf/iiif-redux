import React, { Component } from 'react';
import { connect } from 'react-redux';
import { canvasByIdSelector } from 'iiif-redux/es/api/canvas';
import IntlString from '../IntlString/IntlString';
import { Row, Col, Card, Layout } from 'antd';
import Thumbnail from '../Thumbnail/Thumbnail';

class CanvasPreview extends Component {
  render() {
    const { id, label, thumbnail, onClick } = this.props;
    return (
      <Card
        style={{ margin: 5 }}
        onClick={() => onClick(id)}
        cover={<Thumbnail data={thumbnail} style={{ minHeight: 130 }} />}
      >
        <IntlString>{label}</IntlString>
      </Card>
    );
  }
}

export default connect(
  canvasByIdSelector(api => ({
    label: api.getLabel,
    thumbnail: api.getThumbnail,
  }))
)(CanvasPreview);
