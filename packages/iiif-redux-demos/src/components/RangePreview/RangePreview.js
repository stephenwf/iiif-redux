import React, { Component } from 'react';
import { connect } from 'react-redux';
import { rangeByIdSelector } from 'iiif-redux/es/api/range';
import { canvases } from '../../../../iiif-redux/src/api/canvas';
import { ranges } from '../../../../iiif-redux/src/api/range';
import IntlString from '../IntlString/IntlString';
import { Tree, Card } from 'antd';
const TreeNode = Tree.TreeNode;

class RangePreview extends Component {
  render() {
    return (
      <Tree
        defaultExpandAll
        autoExpandParent
        onSelect={this.props.selectCanvas}
      >
        <TreeNode
          title={<IntlString>{this.props.label}</IntlString>}
          key={this.props.id}
          selectable={false}
        >
          {this.props.canvases.map(canvas => (
            <TreeNode
              key={canvas.id}
              id={canvas.id}
              title={<IntlString>{canvas.label}</IntlString>}
            />
          ))}
          {this.props.ranges.map(range => (
            <TreeNode
              key={range.id}
              id={range.id}
              selectable={false}
              title={<IntlString>{range.label}</IntlString>}
            />
          ))}
        </TreeNode>
      </Tree>
    );
  }
}

function mapRange(rangeApi) {
  return {
    id: rangeApi.getId,
    type: rangeApi.getType,
    label: rangeApi.getLabel,
    ranges: ranges(rangeApi.getRanges, mapRange),
    canvases: canvases(rangeApi.getCanvases, canvasApi => ({
      id: canvasApi.getId,
      type: canvasApi.getType,
      label: canvasApi.getLabel,
    })),
  };
}

export default connect(rangeByIdSelector(mapRange))(RangePreview);
