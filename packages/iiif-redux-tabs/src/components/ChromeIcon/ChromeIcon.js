import React, { Component } from 'react';
import './ChromeIcon.css';
import { Icon } from 'antd';

class ChromeIcon extends Component {
  render() {
    const { type, iconProps, ...props } = this.props;
    return (
      <div className="chrome-icon" {...props}>
        <Icon type={type} {...iconProps} />
      </div>
    );
  }
}

export default ChromeIcon;
