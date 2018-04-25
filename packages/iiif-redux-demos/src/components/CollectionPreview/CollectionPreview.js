import React, { Component } from 'react';
import { connect } from 'react-redux';
import { collectionByIdSelector } from 'iiif-redux/es/api/collection';
import { Card } from 'antd';
import IntlString from '../IntlString/IntlString';

class CollectionPreview extends Component {
  render() {
    const { id, label, onClick } = this.props;
    return (
      <Card
        onClick={() => onClick(id)}
        style={{ margin: 15 }}
        title={<IntlString>{label}</IntlString>}
      >
        {id}
      </Card>
    );
  }
}

export default connect(
  collectionByIdSelector(api => ({
    id: api.getId,
    label: api.getLabel,
  }))
)(CollectionPreview);
