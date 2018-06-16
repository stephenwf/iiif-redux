import React, { Component } from 'react';
import './ChromeTabs.css';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import ChromeTab from '../ChromeTab/ChromeTab';
import logo from '../../../../../iiif-redux-white.png';

const SortableChromeTabs = SortableContainer(
  ({ items, current, onClick, onClose, eWidth, ...props }) => (
    <div className="chrome-tab-container" style={{ display: 'flex' }}>
      {items.map(({ id, value }, index) => (
        <ChromeTab
          onClick={e => {
            if (!e.target.classList.contains('chrome-tab-close')) {
              onClick(id);
            }
          }}
          onClose={e => {
            e.preventDefault();
            onClose(id);
          }}
          active={id === current}
          leftOffset={(index + 1) * eWidth}
          key={index}
          index={index}
          {...props}
        >
          {value}
        </ChromeTab>
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

  componentDidMount() {
    this.setState({
      mounted: true,
    });
  }

  render() {
    const { tabs, onSortEnd, onClick, onClose, current } = this.props;
    const width = this.getTabWidth(tabs);
    const eWidth = this.getTabEffectiveWidth(width);

    return (
      <div
        ref={ref => {
          this.tabContentEl = ref;
        }}
        className="chrome-tabs chrome-tabs-dark-theme"
      >
        <div className="chrome-tabs-logo">
          <img src={logo} height="100%" width="auto" />
        </div>
        <SortableChromeTabs
          helperClass="chrome-tabs-dragging"
          axis="x"
          lockAxis="x"
          items={tabs}
          width={width}
          eWidth={eWidth}
          onSortEnd={onSortEnd}
          distance={5}
          onClose={onClose}
          onClick={onClick}
          current={current}
        />
        <div className="chrome-tabs-bottom-bar" style={{ zIndex: 3 }} />
      </div>
    );
  }
}

export default ChromeTabs;
