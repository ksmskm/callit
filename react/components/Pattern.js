import React from 'react';
import PropTypes from 'prop-types';

class Pattern extends React.Component {
  render () {
    return (
      <li>
        <div className="pattern">
          <span>{this.props.pattern.name}</span>
          <button className="delete" type="button">delete</button>
        </div>
      </li>
    );
  }
}

Pattern.propTypes = {
  pattern: PropTypes.object.isRequired
};

module.exports = Pattern;
