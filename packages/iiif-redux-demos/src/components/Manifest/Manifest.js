import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as currentManifest from 'iiif-redux/es/api/current-manifest';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Card, Layout } from 'antd';
import StructuralPanel from '../StructuralPanel/StructuralPanel';
import DescriptivePanel from '../DescriptivePanel/DescriptivePanel';
import LinkingPanel from '../LinkingPanel/LinkingPanel';
import TechnicalPanel from '../TechnicalPanel/TechnicalPanel';
const { Content } = Layout;

const Locale = str => {
  return str.children ? str.children[0]['@value'] || '' : '';
};

class Manifest extends Component {
  render() {
    const { onClickSequence } = this.props;
    return (
      <Content>
        <Row gutter={16} style={{ padding: 15 }}>
          <Col span={8}>
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
                    <Col span={12} key={key}>
                      <Card
                        onClick={() => onClickSequence(sequence['@id'])}
                        style={{ margin: 15 }}
                        title={<Locale>{sequence.label}</Locale>}
                      >
                        {sequence['@id']}
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
  })
)(Manifest);
