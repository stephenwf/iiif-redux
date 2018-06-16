import React, { Component } from 'react';
import './ChromeNavigation.css';

class ChromeNavigation extends Component {
  render() {
    const { left, right, ...props } = this.props;
    return (
      <div className="chrome-navigation">
        {left ? left(props) : null}
        <input
          type="text"
          className="chrome-navigation__input"
          placeholder="Search or enter collection or manifest URL"
        />
        {right ? right(props) : null}
      </div>
    );
  }
}

export default ChromeNavigation;
