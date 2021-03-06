import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Card, Row, Col, Layout } from 'antd';
import ViewerComponent from '@canvas-panel/viewer-element/lib/ViewerComponent';
import StructuralPanel from '../StructuralPanel/StructuralPanel';
import DescriptivePanel from '../DescriptivePanel/DescriptivePanel';
import LinkingPanel from '../LinkingPanel/LinkingPanel';
import TechnicalPanel from '../TechnicalPanel/TechnicalPanel';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import PageLayout from '../PageLayout/PageLayout';
import OpenSeadragonViewer from '../OpenSeadragonViewer/OpenSeadragonViewer';
import { canvasByIdSelector } from '../../../../iiif-redux/src/api/canvas';
import resourceLoader from '../../hoc/resourceLoader';

const { Content } = Layout;

class CanvasPanelViewer extends Component {
  state = { error: false };

  componentDidCatch(err, errInfo) {
    console.warn(errInfo);
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return 'Canvas panel not available.';
    }
    return <ViewerComponent {...this.props} />;
  }
}

class Canvas extends Component {
  render() {
    const { label, fetched, selectOtherContent } = this.props;

    if (fetched === false) {
      return <LoadingScreen />;
    }

    return (
      <PageLayout label={label}>
        <Row gutter={16} style={{ padding: 15 }}>
          <Col span={8}>
            <TechnicalPanel
              id={this.props.id}
              type={this.props.type}
              viewingHint={this.props.viewingHint}
              height={this.props.height}
              width={this.props.width}
              behavior={this.props.behavior}
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
              images={this.props.images}
              otherContent={this.props.otherContent}
            />
            <LinkingPanel
              seeAlso={this.props.seeAlso}
              service={this.props.service}
              related={this.props.related}
              within={this.props.within}
              startCanvas={this.props.startCanvas}
            />
          </Col>
          <Col span={16} style={{ height: '100vh' }}>
            <h3>Canvas panel</h3>
            <Card
              style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
              }}
            >
              <OpenSeadragonViewer
                id={this.props.id}
                height={window.innerHeight - 150}
                style={{ background: '#000' }}
              />
            </Card>
            {this.props.images
              ? this.props.images.map((image, key) => {
                  return <div key={key} />;
                })
              : null}
          </Col>
        </Row>
      </PageLayout>
    );
  }
}

export default resourceLoader(
  connect(
    canvasByIdSelector(currentCanvas => ({
      // Technical
      id: currentCanvas.getId,
      type: currentCanvas.getType,
      viewingHint: currentCanvas.getViewingHint,
      height: currentCanvas.getHeight,
      width: currentCanvas.getWidth,
      behavior: currentCanvas.getBehavior,
      // Descriptive
      label: currentCanvas.getLabel,
      description: currentCanvas.getDescription || currentCanvas.getSummary,
      metadata: currentCanvas.getMetadata,
      attribution: currentCanvas.getAttribution,
      logo: currentCanvas.getLogo,
      license: currentCanvas.getLicense,
      thumbnail: currentCanvas.getThumbnail,
      // Linking
      within: currentCanvas.getWithin,
      rendering: currentCanvas.getRendering,
      related: currentCanvas.getRelated,
      service: currentCanvas.getService,
      seeAlso: currentCanvas.getSeeAlso,
      // Structural
      images: currentCanvas.getImages,
      otherContent: currentCanvas.getOtherContent,
      // Other
      imageService: currentCanvas.getImageService,
    }))
  )(Canvas)
);
