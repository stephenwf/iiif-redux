import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as currentCollection from 'iiif-redux/es/api/current-collection';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Card, Layout, List, Badge } from 'antd';
import StructuralPanel from './components/StructuralPanel/StructuralPanel';
import DescriptivePanel from './components/DescriptivePanel/DescriptivePanel';
import IntlString from './components/IntlString/IntlString';
const { Header, Content, Footer } = Layout;

const Locale = str => {
  return str.children ? str.children[0]['@value'] || '' : '';
};

class Collection extends Component {
  render() {
    const { onClickCollection } = this.props;
    return (
      <Content>
        <Row gutter={16} style={{ padding: 15 }}>
          <Col span={8}>
            <StructuralPanel
              collections={this.props.collections}
              manifests={this.props.manifests}
              otherContent={this.props.otherContent}
            />
            <DescriptivePanel
              label={this.props.label}
              description={this.props.description}
              metadata={this.props.metadata}
              attribution={this.props.attribution}
              logo={this.props.logo}
              license={this.props.license}
              thumbnail={this.props.thumbnail}
            />
          </Col>
          <Col span={16}>
            {this.props.collections.length ? (
              <div>
                <h3>Collections</h3>
                <Row gutter={16} style={{ padding: 15 }}>
                  {this.props.collections.map((collection, key) => (
                    <Col span={12} key={key}>
                      <Card
                        onClick={() => onClickCollection(collection['@id'])}
                        style={{ margin: 15 }}
                        title={<Locale>{collection.label}</Locale>}
                      >
                        {collection['@id']}
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
        </Row>
      </Content>
    );
  }
}

export default connect(
  createStructuredSelector({
    collections: currentCollection.getCollections,
    manifests: currentCollection.getManifests,
    members: currentCollection.getMemberIds,
    otherContent: currentCollection.getOtherContent,
    label: currentCollection.getLabel,
    description: currentCollection.getDescription,
    metadata: currentCollection.getMetadata,
    attribution: currentCollection.getAttribution,
    logo: currentCollection.getLogo,
    license: currentCollection.getLicense,
    thumbnail: currentCollection.getThumbnail,
  })
)(Collection);
