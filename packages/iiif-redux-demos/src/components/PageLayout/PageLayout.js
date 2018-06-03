import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Icon } from 'antd';
import IntlString from '../IntlString/IntlString';
const { Header, Content } = Layout;

class PageLayout extends Component {
  render() {
    return (
      <div>
        <Header>
          <h3 style={{ color: '#fff' }}>
            <Icon
              onClick={this.props.history.goBack}
              type="arrow-left"
              style={{ marginRight: 15 }}
            />
            <IntlString>{this.props.label}</IntlString>
          </h3>
          <Icon
            type="close-circle-o"
            onClick={() => this.props.history.push('/')}
            style={{
              position: 'absolute',
              top: 0,
              right: 20,
              color: '#fff',
              fontSize: 22,
              lineHeight: '64px',
              cursor: 'pointer',
            }}
          />
        </Header>
        <Content>{this.props.children}</Content>
      </div>
    );
  }
}

export default withRouter(PageLayout);
