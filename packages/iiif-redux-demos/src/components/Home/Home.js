import React, { Component } from 'react';
import { Input, List, Icon, Row, Col } from 'antd';
import logo from '../../../../../iiif-redux.png';
import { Link, withRouter } from 'react-router-dom';

class Home extends Component {
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
    {
      label: 'Wellcome Archives',
      url: 'https://wellcomelibrary.org/service/collections/archives/lightweight',
    }
  ];

  manifests = [
    {
      label: 'Wunder der Vererbung',
      url: 'https://wellcomelibrary.org/iiif/b18035723/manifest',
    },
    {
      label: 'Forth Bridge illustrations 1886-1887',
      url: 'https://view.nls.uk/manifest/7446/74464117/manifest.json',
    },
  ];

  render() {
    return (
      <div>
        <Row>
          <Col span={12} offset={6}>
            <div style={{ textAlign: 'center' }}>
              <img src={logo} width={510} />
            </div>
            <h3>Collections</h3>
            <Input.Search
              size="large"
              placeholder="Enter a collection URL."
              onSearch={value =>
                this.props.history.push(`/collection?id=${value}`)
              }
              enterButton="View collection"
            />
            <br />
            <br />
            <List
              size="large"
              bordered
              dataSource={this.collections}
              renderItem={item => (
                <List.Item
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    this.props.history.push(`/collection?id=${item.url}`)
                  }
                >
                  {item.label}
                </List.Item>
              )}
            />
            <br />
            <br />
            <h3>Manifests</h3>
            <Input.Search
              size="large"
              placeholder="Enter a manifest URL."
              onSearch={value =>
                this.props.history.push(`/manifest?id=${value}`)
              }
              enterButton="View manifest"
            />
            <br />
            <br />
            <List
              size="large"
              bordered
              dataSource={this.manifests}
              renderItem={item => (
                <List.Item
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    this.props.history.push(`/manifest?id=${item.url}`)
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
}

export default withRouter(Home);
