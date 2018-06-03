import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Spin, Icon, Layout } from 'antd';
import StructuralPanel from '../StructuralPanel/StructuralPanel';
import DescriptivePanel from '../DescriptivePanel/DescriptivePanel';
import LinkingPanel from '../LinkingPanel/LinkingPanel';
import TechnicalPanel from '../TechnicalPanel/TechnicalPanel';
import ManifestPreview from '../ManifestPreview/ManifestPreview';
import CollectionPreview from '../CollectionPreview/CollectionPreview';
import { collectionByIdSelector } from 'iiif-redux/es/api/collection';
import { selectCollection } from 'iiif-redux/es/spaces/routing';
import IntlString from '../IntlString/IntlString';
const { Content, Header } = Layout;
import { withRouter } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import PageLayout from '../PageLayout/PageLayout';

class Collection extends Component {
  componentWillMount() {
    this.fetchCollection(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.id !== this.props.id) {
      this.fetchCollection(newProps);
    }
  }

  fetchCollection({ fetched, id }) {
    if (fetched === false) {
      this.props.dispatch(selectCollection({ id }));
    }
  }

  render() {
    const { label, loading, fetched } = this.props;

    if (fetched === false) {
      return <LoadingScreen />;
    }

    return (
      <PageLayout label={label}>
        <Row gutter={16} style={{ padding: 15, paddingTop: 30 }}>
          <Col span={8}>
            <TechnicalPanel
              id={this.props.id}
              type={this.props.type}
              viewingHint={this.props.viewingHint}
              navDate={this.props.navDate}
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
            <StructuralPanel
              collections={this.props.collections}
              manifests={this.props.manifests}
              otherContent={this.props.otherContent}
            />
            <LinkingPanel
              seeAlso={this.props.seeAlso}
              service={this.props.service}
              related={this.props.related}
              within={this.props.within}
            />
          </Col>
          <Col span={16}>
            {loading ? (
              <div style={{ paddingTop: 200, textAlign: 'center' }}>
                <Spin />
              </div>
            ) : null}
            {this.props.collections.length ? (
              <div>
                <h3>Collections</h3>
                <Row gutter={16} style={{ padding: 15 }}>
                  {this.props.collections.map((collection, key) => (
                    <Col span={12} key={key}>
                      <CollectionPreview
                        key={key}
                        id={collection['@id']}
                        onClick={() =>
                          this.props.history.push(
                            `/collection?id=${collection['@id']}`
                          )
                        }
                      />
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
                      <ManifestPreview
                        id={manifest['@id']}
                        key={key}
                        onClick={() =>
                          this.props.history.push(
                            `/manifest?id=${manifest['@id']}`
                          )
                        }
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            ) : null}
          </Col>
        </Row>
      </PageLayout>
    );
  }
}

export default withRouter(
  connect(
    collectionByIdSelector(
      currentCollection => ({
        id: currentCollection.getId,
        type: currentCollection.getType,
        viewingHint: currentCollection.getViewingHint,
        navDate: currentCollection.getNavDate,
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
        seeAlso: currentCollection.getSeeAlso,
        service: currentCollection.getService,
        related: currentCollection.getRelated,
        within: currentCollection.getWithin,
      }),
      { dereference: true }
    )
  )(Collection)
);
