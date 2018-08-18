import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Spin, Row, Col, Card } from 'antd';
import CanvasPreview from '../CanvasPreview/CanvasPreview';
import StructuralPanel from '../StructuralPanel/StructuralPanel';
import DescriptivePanel from '../DescriptivePanel/DescriptivePanel';
import LinkingPanel from '../LinkingPanel/LinkingPanel';
import TechnicalPanel from '../TechnicalPanel/TechnicalPanel';
import SequencePreview from '../SequencePreview/SequencePreview';
import PageLayout from '../PageLayout/PageLayout';
import { manifestByIdSelector } from 'iiif-redux/es/api/manifest';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import resourceLoader from '../../hoc/resourceLoader';
import PaginatedList from '../PaginatedList/PaginatedList';
import RangePreview from '../RangePreview/RangePreview';

class Manifest extends Component {
  render() {
    const { label, loading, fetched } = this.props;

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
            {this.props.ranges && this.props.ranges.length ? (
              <div>
                <h3>Ranges</h3>
                <Card style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {this.props.ranges.length
                    ? this.props.ranges.map(range => (
                        <RangePreview
                          selectCanvas={this.props.selectCanvas}
                          id={range}
                        />
                      ))
                    : null}
                </Card>
              </div>
            ) : null}
          </Col>
          <Col span={16}>
            {loading ? (
              <div style={{ paddingTop: 200, textAlign: 'center' }}>
                <Spin />
              </div>
            ) : null}
            {this.props.canvases && this.props.canvases.length ? (
              <PaginatedList perPage={20} dataSet={this.props.canvases}>
                {allCanvases => (
                  <Row gutter={16} style={{ padding: 15 }}>
                    {allCanvases.map((canvas, key) => (
                      <Col span={6} key={key}>
                        <CanvasPreview
                          id={canvas}
                          key={key}
                          onClick={this.props.selectCanvas}
                        />
                      </Col>
                    ))}
                  </Row>
                )}
              </PaginatedList>
            ) : null}
            {this.props.sequences && this.props.sequences.length ? (
              <div>
                <h3>Sequences</h3>
                <PaginatedList perPage={20} dataSet={this.props.sequences}>
                  {allSequences => (
                    <Row gutter={16} style={{ padding: 15 }}>
                      {allSequences.map((sequence, key) => (
                        <Col span={24} key={key}>
                          <SequencePreview
                            id={sequence}
                            key={key}
                            onClick={this.props.selectSequence}
                            onClickCanvas={this.props.selectCanvas}
                          />
                        </Col>
                      ))}
                    </Row>
                  )}
                </PaginatedList>
              </div>
            ) : null}
          </Col>
        </Row>
      </PageLayout>
    );
  }
}

export default resourceLoader(
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
        sequences: currentManifest.getSequenceIds,
        canvases: currentManifest.getCanvasIds,
        ranges: currentManifest.getRangeIds,
        otherContent: currentManifest.getOtherContent,
      }),
      { dereference: true }
    )
  )(Manifest)
);
