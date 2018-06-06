import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Layout } from 'antd';
import StructuralPanel from '../StructuralPanel/StructuralPanel';
import DescriptivePanel from '../DescriptivePanel/DescriptivePanel';
import LinkingPanel from '../LinkingPanel/LinkingPanel';
import TechnicalPanel from '../TechnicalPanel/TechnicalPanel';
import CanvasPreview from '../CanvasPreview/CanvasPreview';
import { sequenceByIdSelector } from '../../../../iiif-redux/src/api/sequence';
import resourceLoader from '../../hoc/resourceLoader';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import PageLayout from '../PageLayout/PageLayout';
import PaginatedList from '../PaginatedList/PaginatedList';
const { Content } = Layout;

class Sequence extends Component {
  render() {
    const { label, fetched, selectCanvas } = this.props;

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
            <StructuralPanel canvases={this.props.canvases} />
            <LinkingPanel
              seeAlso={this.props.seeAlso}
              service={this.props.service}
              related={this.props.related}
              within={this.props.within}
              startCanvas={this.props.startCanvas}
            />
          </Col>
          <Col span={16}>
            {this.props.canvases.length ? (
              <div>
                <h3>Canvases</h3>
                <PaginatedList
                  dataSet={this.props.canvases}
                  style={{ paddingTop: 20, paddingBottom: 20 }}
                >
                  {dataSet => (
                    <Row
                      gutter={16}
                      style={{ padding: 15, marginTop: 20, marginBottom: 20 }}
                    >
                      {dataSet.map((canvas, key) => (
                        <Col span={8} key={key}>
                          <CanvasPreview
                            id={canvas['@id']}
                            key={key}
                            onClick={selectCanvas}
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
    sequenceByIdSelector(currentSequence => ({
      // Technical
      id: currentSequence.getId,
      type: currentSequence.getType,
      viewingHint: currentSequence.getViewingHint,
      viewingDirection: currentSequence.getViewingDirection,
      // Descriptive
      label: currentSequence.getLabel,
      description: currentSequence.getDescription,
      metadata: currentSequence.getMetadata,
      attribution: currentSequence.getAttribution,
      logo: currentSequence.getLogo,
      license: currentSequence.getLicense,
      thumbnail: currentSequence.getThumbnail,
      // Linking
      within: currentSequence.getWithin,
      rendering: currentSequence.getRendering,
      related: currentSequence.getRelated,
      service: currentSequence.getService,
      seeAlso: currentSequence.getSeeAlso,
      startCanvas: currentSequence.getStartCanvas,
      // Structural
      canvases: currentSequence.getCanvases,
    }))
  )(Sequence)
);
