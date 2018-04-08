import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as currentCollection from 'iiif-redux/es/api/current-collection';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Card, Button, Layout } from 'antd';
const { Header, Content, Footer } = Layout;

const Locale = str => {
  return str.children ? str.children[0]['@value'] || '' : '';
};

class Collection extends Component {
  render() {
    return (
      <Layout>
        <Header>
          <h3 style={{ color: '#fff' }}>
            <Locale>{this.props.label}</Locale>
          </h3>
        </Header>
        <Content>
          <Row gutter={16} style={{ padding: 15 }}>
            {this.props.collections.map((manifest, key) => (
              <Col span={8} key={key}>
                <Card style={{ margin: 15 }} title={manifest.label}>
                  {manifest['@id']}
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
        <Footer>{this.props.attribution}</Footer>
      </Layout>
    );
  }
}

export default connect(
  createStructuredSelector({
    label: currentCollection.getLabel,
    collections: currentCollection.getCollections,
    attribution: currentCollection.getAttribution,
  })
)(Collection);
