import React, { Component } from 'react';
import './ChromeTabs.css';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

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
        <div className="chrome-tab-close" />
      </div>
    );
  }
}

const SortableChromeTab = SortableElement(props => <ChromeTab {...props} />);

const SortableChromeTabs = SortableContainer(
  ({ items, current, onClick, eWidth, ...props }) => (
    <div style={{ display: 'flex' }}>
      {items.map(({ id, value }, index) => (
        <SortableChromeTab
          onClick={() => onClick(id)}
          active={id === current}
          leftOffset={(index + 1) * eWidth}
          key={`item-${index}`}
          index={index}
          {...props}
        >
          {value}
        </SortableChromeTab>
      ))}
    </div>
  )
);

class ChromeTabs extends Component {
  tabContentEl = null;
  options = {
    tabOverlapDistance: 10,
    minWidth: 40,
    maxWidth: 180,
  };

  getTabEffectiveWidth(tabWidth) {
    return tabWidth - this.options.tabOverlapDistance;
  }

  getTabWidth(tabs) {
    if (!this.tabContentEl) {
      return this.options.maxWidth;
    }
    const tabsContentWidth =
      this.tabContentEl.clientWidth - this.options.tabOverlapDistance;
    const width =
      tabsContentWidth / tabs.length + this.options.tabOverlapDistance;

    return Math.max(
      this.options.minWidth,
      Math.min(this.options.maxWidth, width)
    );
  }

  state = { tabs: [], current: 0 };

  componentDidMount() {
    this.setState({
      tabs: this.props.tabs,
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.tabs !== this.props.tabs) {
      this.setState({ tabs: newProps.tabs });
    }
  }

  render() {
    const { tabs } = this.state;
    const width = this.getTabWidth(tabs);
    const eWidth = this.getTabEffectiveWidth(width);

    return (
      <div
        ref={ref => {
          this.tabContentEl = ref;
        }}
        className="chrome-tabs chrome-tabs-dark-theme"
      >
        <SortableChromeTabs
          helperClass="chrome-tabs-dragging"
          axis="x"
          lockAxis="x"
          items={tabs}
          width={width}
          eWidth={eWidth}
          onSortEnd={this.props.onSortEnd}
          distance={5}
          current={this.state.current}
          onClick={id => {
            console.log(id);
            this.setState({ current: id });
          }}
        />
        <div className="chrome-tabs-bottom-bar" style={{ zIndex: 3 }} />
      </div>
    );
  }
}

export default ChromeTabs;
