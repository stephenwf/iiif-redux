import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Card, Layout } from 'antd';
import StructuralPanel from '../StructuralPanel/StructuralPanel';
import DescriptivePanel from '../DescriptivePanel/DescriptivePanel';
import LinkingPanel from '../LinkingPanel/LinkingPanel';
import TechnicalPanel from '../TechnicalPanel/TechnicalPanel';
import SequencePreview from '../SequencePreview/SequencePreview';
import PageLayout from '../PageLayout/PageLayout';
import { manifestByIdSelector } from 'iiif-redux/es/api/manifest';
import { withRouter } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { selectManifest } from 'iiif-redux/es/spaces/routing';

class Manifest extends Component {
  componentWillMount() {
    this.fetchManifest(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.id !== this.props.id) {
      this.fetchManifest(newProps);
    }
  }

  fetchManifest({ fetched, id }) {
    if (fetched === false) {
      this.props.dispatch(selectManifest({ id }));
    }
  }

  render() {
    const { label, onClickSequence, onClickCanvas, fetched } = this.props;

    if (fetched === false) {
      return <LoadingScreen />;
    }

    return (
      <PageLayout label={label}>
        <Row gutter={16} style={{ padding: 15 }}>
          <Col
            span={8}
            style={{
              position: 'sticky',
              top: 10,
              overflow: 'auto',
              maxHeight: '100vh',
            }}
          >
            <TechnicalPanel
              id={this.props.id}
              type={this.props.type}
              viewingHint={this.props.viewingHint}
              viewingDirection={this.props.viewingDirection}
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
              sequences={this.props.sequences}
              ranges={this.props.ranges}
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
            {this.props.sequences.length ? (
              <div>
                <h3>Sequences</h3>
                <Row gutter={16} style={{ padding: 15 }}>
                  {this.props.sequences.map((sequence, key) => (
                    <Col span={24} key={key}>
                      <SequencePreview
                        id={sequence['@id']}
                        key={key}
                        onClick={onClickSequence}
                        onClickCanvas={onClickCanvas}
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
    manifestByIdSelector(
      currentManifest => ({
        // Technical
        id: currentManifest.getId,
        type: currentManifest.getType,
        viewingHint: currentManifest.getViewingHint,
        viewingDirection: currentManifest.getViewingDirection,
        navDate: currentManifest.getNavDate,
        // Descriptive
        label: currentManifest.getLabel,
        description: currentManifest.getDescription,
        metadata: currentManifest.getMetadata,
        attribution: currentManifest.getAttribution,
        logo: currentManifest.getLogo,
        license: currentManifest.getLicense,
        thumbnail: currentManifest.getThumbnail,
        // Linking
        within: currentManifest.getWithin,
        rendering: currentManifest.getRendering,
        related: currentManifest.getRelated,
        service: currentManifest.getService,
        seeAlso: currentManifest.getSeeAlso,
        // Structural
        sequences: currentManifest.getSequences,
        ranges: currentManifest.getRanges,
        otherContent: currentManifest.getOtherContent,
      }),
      { dereference: true }
    )
  )(Manifest)
);
