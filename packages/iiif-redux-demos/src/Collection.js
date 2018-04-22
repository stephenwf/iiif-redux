import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as currentCollection from 'iiif-redux/es/api/current-collection';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Card, Layout, List, Badge } from 'antd';
import StructuralPanel from './components/StructuralPanel/StructuralPanel';
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
            <Col span={16}>
              {this.props.collections.length ? (
                <div>
                  <h3>Collections</h3>
                  <Row gutter={16} style={{ padding: 15 }}>
                    {this.props.collections.map((manifest, key) => (
                      <Col span={12} key={key}>
                        <Card
                          style={{ margin: 15 }}
                          title={<Locale>{manifest.label}</Locale>}
                        >
                          {manifest['@id']}
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              ) : null}
              {this.props.manifests.length ? (
                <div>
                  <h3>Manifests</h3>
                  <Row gutter={16} style={{ padding: 15 }}>
                    {this.props.manifests.map((manifest, key) => (
                      <Col span={12} key={key}>
                        <Card
                          style={{ margin: 15 }}
                          title={<Locale>{manifest.label}</Locale>}
                        >
                          {manifest['@id']}
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              ) : null}
            </Col>
            <Col span={8}>
              <StructuralPanel
                collections={this.props.collections}
                manifests={this.props.manifests}
                otherContent={this.props.otherContent}
              />
            </Col>
          </Row>
        </Content>
        <Footer>
          <Locale>{this.props.attribution}</Locale>
        </Footer>
      </Layout>
    );
  }
}

export default connect(
  createStructuredSelector({
    label: currentCollection.getLabel,
    collections: currentCollection.getCollections,
    manifests: currentCollection.getManifests,
    attribution: currentCollection.getAttribution,
    members: currentCollection.getMemberIds,
    otherContent: currentCollection.getOtherContent,
  })
)(Collection);
