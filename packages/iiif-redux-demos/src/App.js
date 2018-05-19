import React, { Component } from 'react';
import TopLevelCollection from './components/TopLevelCollection/TopLevelCollection';
import { Input, List, Icon, Row, Col } from 'antd';
import logo from '../../../iiif-redux.png';

function getHash() {
  const rawHash = window.location.hash.substring(1);
  const hash = rawHash.indexOf('?') === 0 ? rawHash.substring(1) : rawHash;
  return hash
    .split('&')
    .map(el => el.split('='))
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
}

class App extends Component {
  state = { topLevelCollection: null };

  componentWillMount() {
    const hash = getHash();
    if (hash.collection) {
      this.setState({ topLevelCollection: hash.collection });
    }

    window.addEventListener('hashchange', this.onHashChange, false);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.onHashChange, false);
  }

  onHashChange = () => {
    const hash = getHash();
    this.setState({ topLevelCollection: hash.collection || null });
  };

  collections = [
    {
      label: 'Wellcome Library',
      url: 'https://wellcomelibrary.org/service/collections/',
    },
    {
      label: 'IIIF Universe',
      url:
        'https://raw.githubusercontent.com/ryanfb/iiif-universe/gh-pages/iiif-universe.json',
    },
    {
      label: 'National Library of Scotland',
      url: 'https://view.nls.uk/collections/top.json',
    },
    {
      label: 'The Indigenous Digital Archive',
      url: 'https://manifests.dlcs-ida.org/top',
    },
  ];

  render() {
    const { topLevelCollection } = this.state;

    if (!topLevelCollection) {
      return (
        <div>
          <Row>
            <Col span={12} offset={6}>
              <div style={{ textAlign: 'center' }}>
                <img src={logo} width={510} />
              </div>
              <Input.Search
                size="large"
                placeholder="Enter a collection URL."
                onSearch={value =>
                  (window.location.hash = `?collection=${value}`)
                }
                enterButton="View collection"
              />
              <br />
              <br />
              <h3>Alternatively choose from here</h3>
              <List
                size="large"
                bordered
                dataSource={this.collections}
                renderItem={item => (
                  <List.Item
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      (window.location.hash = `?collection=${item.url}`)
                    }
                  >
                    {item.label}
                  </List.Item>
                )}
              />
            </Col>
          </Row>
          <div style={{ textAlign: 'center', marginTop: 80 }}>
            <Icon type="code" style={{ marginRight: 5 }} />
            Created by{' '}
            <a href="https://stephen.wf" target="_blank">
              Stephen Fraser
            </a>
            <Icon
              type="api"
              style={{ marginLeft: 20, marginRight: 20, color: '#ccc' }}
            />
            <a href="https://github.com/stephenwf/iiif-redux">
              <Icon type="github" style={{ marginRight: 5 }} />
              See project on Github
            </a>
          </div>
        </div>
      );
    }

    return (
      <div>
        <TopLevelCollection collection={topLevelCollection} />
        <a style={{ position: 'absolute', top: 0, right: 20 }} href="#">
          <Icon
            type="close-circle-o"
            style={{ color: '#fff', fontSize: 22, lineHeight: '64px' }}
          />
        </a>
      </div>
    );
  }
}

export default App;
