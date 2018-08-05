import React, { Component } from 'react';
import './ChromeTab.scss';
import { SortableElement } from 'react-sortable-hoc';

class ChromeTab extends Component {
  render() {
    return (
      <div
        onClick={this.props.onClick}
        className={`${
          this.props.active ? 'chrome-tab-current' : ''
        } chrome-tab`}
        style={{
          width: this.props.width,
        }}
      >
        <div className="chrome-tab-background">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <symbol id="chrome-tab-geometry-left" viewBox="0 0 214 29">
                <path d="M14.3 0.1L214 0.1 214 29 0 29C0 29 12.2 2.6 13.2 1.1 14.3-0.4 14.3 0.1 14.3 0.1Z" />
              </symbol>
              <symbol id="chrome-tab-geometry-right" viewBox="0 0 214 29">
                <use href="#chrome-tab-geometry-left" />
              </symbol>
              <clipPath id="crop">
                <rect className="mask" width="100%" height="100%" x="0" />
              </clipPath>
            </defs>
            <svg width="50%" height="100%">
              <use
                href="#chrome-tab-geometry-left"
                width="214"
                height="29"
                className="chrome-tab-background"
              />
              <use
                href="#chrome-tab-geometry-left"
                width="214"
                height="29"
                className="chrome-tab-shadow"
              />
            </svg>
            <g transform="scale(-1, 1)">
              <svg width="50%" height="100%" x="-100%" y="0">
                <use
                  href="#chrome-tab-geometry-right"
                  width="214"
                  height="29"
                  className="chrome-tab-background"
                />
                <use
                  href="#chrome-tab-geometry-right"
                  width="214"
                  height="29"
                  className="chrome-tab-shadow"
                />
              </svg>
            </g>
          </svg>
        </div>
        <div className="chrome-tab-favicon" />
        <div className="chrome-tab-title">{this.props.children}</div>
        <div className="chrome-tab-close" onClick={this.props.onClose} />
      </div>
    );
  }
}

export default SortableElement(props => <ChromeTab {...props} />);
