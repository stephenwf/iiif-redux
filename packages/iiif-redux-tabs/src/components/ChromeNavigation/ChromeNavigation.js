import React, { Component } from 'react';
import './ChromeNavigation.css';

class ChromeNavigation extends Component {
  state = { textValue: '' };

  handleKeyUp = e => {
    if (e.keyCode === 13) {
      // Enter key
      this.props.onSearch(this.textInput.value);
    }
  };

  handleChange = e => {
    this.setState({ searchValue: e.target.value });
  };

  componentWillReceiveProps(newProps) {
    if (this.props.searchValue !== newProps.searchValue) {
      this.setState({ searchValue: newProps.searchValue });
    }
  }

  render() {
    const { left, right, ...props } = this.props;
    return (
      <div className="chrome-navigation">
        {left ? left(props) : null}
        <input
          value={this.state.searchValue}
          ref={ref => (this.textInput = ref)}
          type="text"
          className="chrome-navigation__input"
          placeholder="Search or enter collection or manifest URL"
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
        />
        {right ? right(props) : null}
      </div>
    );
  }
}

export default ChromeNavigation;
