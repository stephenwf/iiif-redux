import React, { Component } from 'react';
import { Row, Spin, Icon, Layout } from 'antd';
import { withRouter } from 'react-router-dom';
const { Content, Header } = Layout;

class LoadingScreen extends Component {
  render() {
    return (
      <div>
        <Header>
          <Icon
            onClick={this.props.history.goBack}
            type="arrow-left"
            style={{ marginRight: 15 }}
          />
          <h3 style={{ color: 'rgba(255, 255, 255, .4)' }}>loading...</h3>
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
        <Content>
          <Row
            gutter={16}
            style={{
              padding: 15,
              paddingTop: 200,
              height: '100vh',
              textAlign: 'center',
            }}
          >
            <Spin delay={500} />
          </Row>
        </Content>
      </div>
    );
  }
}

export default withRouter(LoadingScreen);
