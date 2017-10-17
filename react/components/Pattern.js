import React from 'react';
import PropTypes from 'prop-types';

class Pattern extends React.Component {
  getDefaultProps () {
    return {
      handleOnClick: function () {
        console.log('dummy click handler');
      }
    };
  }

  render () {
    return (
      <li onClick={this.props.handleOnClick.bind(null, this.props.pattern)}>
        <div className="pattern" data-counts={this.props.pattern.count}>
          <span>{this.props.pattern.name}</span>
          <span>{this.props.pattern.count}</span>
          <button className="delete" type="button">delete</button>
        </div>
      </li>
    );
  }
}

Pattern.propTypes = {
  key: PropTypes.number.isRequired,
  pattern: PropTypes.object.isRequired,
  handleOnClick: PropTypes.function.isRequired
};

module.exports = Pattern;
