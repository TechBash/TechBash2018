import React from 'react';
import PropTypes from 'prop-types';

export default class VirtualizedList extends React.PureComponent {
  state = {
    containerHeight: 0,
    scrollTop: 0
  };
  
  componentDidMount() {
    this.setState({
        containerHeight: this.scrollContainer.clientHeight
    });
  }

  handleScroll = (event) => {
    this.setState({
      scrollTop: event.target.scrollTop
    });
  };
  
  render() {
    const { containerClassName, listClassName } = this.props;
    const { rowCount, rowHeight, rowRenderer } = this.props;
    const { containerHeight, scrollTop } = this.state;

    const innerContainerHeight = rowHeight * rowCount;

    const scrollBottom = scrollTop + containerHeight;

    const rowPadding = 2;
    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - rowPadding);
    const stopIndex = Math.min(rowCount, Math.ceil(scrollBottom / rowHeight) + rowPadding);

    const renderedRows = [];
    for (let i = startIndex; i < stopIndex; i++) {
      renderedRows.push(rowRenderer(i));
    }

    const paddingTop = startIndex * rowHeight;
    return (
      <div
        onScroll={this.handleScroll}
        className={containerClassName}
        ref={node => this.scrollContainer = node}>
        <ul style={{ paddingTop: paddingTop, height: innerContainerHeight - paddingTop}} className={listClassName}>
            {renderedRows}
        </ul>
      </div>
    );
  }
}

VirtualizedList.propTypes = {
    rowCount: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    rowRenderer: PropTypes.func.isRequired,
    containerClassName: PropTypes.string,
    listClassName: PropTypes.string
};
