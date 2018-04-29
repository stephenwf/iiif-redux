import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sequenceByIdSelector } from 'iiif-redux/es/api/sequence';
import { Card, Row, Col } from 'antd';
import IntlString from '../IntlString/IntlString';
import CanvasPreview from '../CanvasPreview/CanvasPreview';

class SequencePreview extends Component {
  render() {
    const { id, label, canvases, onClick, onClickCanvas } = this.props;

    return (
      <Card
        onClick={() => onClick(id)}
        style={{ margin: 15 }}
        title={<IntlString>{label}</IntlString>}
      >
        {id}
        <Row>
          {canvases.map((canvasId, key) => (
            <Col span={6} key={key}>
              <CanvasPreview onClick={onClickCanvas} id={canvasId} />
            </Col>
          ))}
        </Row>
      </Card>
    );
  }
}

export default connect(
  sequenceByIdSelector(api => ({
    id: api.getId,
    label: api.getLabel,
    canvases: api.getCanvasIds,
  }))
)(SequencePreview);
