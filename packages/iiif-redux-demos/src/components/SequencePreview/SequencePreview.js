import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sequenceByIdSelector } from 'iiif-redux/es/api/sequence';
import { Card, Row, Col, Button } from 'antd';
import IntlString from '../IntlString/IntlString';
import CanvasPreview from '../CanvasPreview/CanvasPreview';
import PaginatedList from '../PaginatedList/PaginatedList';

class SequencePreview extends Component {
  render() {
    const { id, label, canvases, onClick, onClickCanvas } = this.props;

    return (
      <Card
        style={{ margin: 15 }}
        title={
          <span>
            <IntlString>{label}</IntlString>{' '}
            <Button onClick={() => onClick(id)}>Show detail</Button>
          </span>
        }
      >
        {id}
        <PaginatedList dataSet={canvases}>
          {allCanvases => (
            <Row style={{ paddingTop: 15, paddingBottom: 15 }}>
              {allCanvases.map((canvasId, key) => (
                <Col span={6} key={key}>
                  <CanvasPreview onClick={onClickCanvas} id={canvasId} />
                </Col>
              ))}
            </Row>
          )}
        </PaginatedList>
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
