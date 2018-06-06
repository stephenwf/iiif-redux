import React, { Component } from 'react';
import { Pagination } from 'antd';

class PaginatedList extends Component {
  state = { current: 1 };

  onChange = page => {
    this.setState({ current: page });
  };

  static defaultProps = {
    perPage: 20,
  };

  getDataSet(start, perPage) {
    const { dataSet } = this.props;
    return dataSet.slice(start, start + perPage);
  }

  render() {
    const { current } = this.state;
    const { perPage, dataSet, style } = this.props;
    return (
      <div>
        <Pagination
          hideOnSinglePage
          current={current}
          onChange={this.onChange}
          pageSize={perPage}
          total={dataSet.length}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
        />
        {this.props.children(this.getDataSet((current - 1) * perPage, perPage))}
        <Pagination
          hideOnSinglePage
          current={current}
          onChange={this.onChange}
          pageSize={perPage}
          total={dataSet.length}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          style={{ width: '100%' }}
        />
      </div>
    );
  }
}

export default PaginatedList;
