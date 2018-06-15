import React, { Component } from 'react';
import ChromeTabs from '../ChromeTabs/ChromeTabs';
import { arrayMove } from 'react-sortable-hoc';
import './App.css';
import { Icon } from 'antd';

class App extends Component {
  state = {
    tabs: [{ id: 0, value: 'testing - 1' }, { id: 1, value: 'testing - 2' }],
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(state => ({
      tabs: arrayMove(state.tabs, oldIndex, newIndex),
    }));
  };

  render() {
    return (
      <div>
        <ChromeTabs tabs={this.state.tabs} onSortEnd={this.onSortEnd} />
        <div style={{ height: 35, background: '#505050', display: 'flex' }}>
          <div
            onClick={() => {
              this.setState({
                tabs: [
                  ...this.state.tabs,
                  {
                    id: this.state.tabs.length + 1,
                    value: `testing - ${this.state.tabs.length + 1}`,
                  },
                ],
              });
            }}
            style={{
              lineHeight: '30px',
              fontSize: 15,
              color: '#fff',
              width: 30,
              height: 30,
              textAlign: 'center',
            }}
          >
            <Icon type="left" />
          </div>
          <div
            style={{
              lineHeight: '30px',
              fontSize: 15,
              color: '#fff',
              width: 30,
              height: 30,
              textAlign: 'center',
            }}
          >
            <Icon type="right" />
          </div>
          <div
            style={{
              lineHeight: '30px',
              fontSize: 15,
              color: '#fff',
              width: 30,
              height: 30,
              textAlign: 'center',
            }}
          >
            <Icon type="reload" />
          </div>
          <input
            type="text"
            style={{
              flex: 1,
              height: 28,
              margin: 5,
              marginTop: 2,
              fontSize: 12,
              padding: 0,
              paddingLeft: 10,
              color: '#fff',
              lineHeight: 35,
              border: 'none',
              background: '#222',
              outline: 'none',
              borderRadius: 3,
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
