import React from 'react';
import PropTypes from 'prop-types';
import Pattern from './Pattern';

class PatternList extends React.Component {

  render () {
    var patterns = this.props.patterns.map((function (pattern, index) {
      return <Pattern key={index} pattern={pattern} handleRemove={this.props.handleRemove} />;
    }).bind(this));

    return (
      <ul id="pattern-list" className="list">
        {patterns}
      </ul>
    );
  }
}

PatternList.propTypes = {
  patterns: PropTypes.array.isRequired,
  handleRemove: PropTypes.func.isRequired
};

module.exports = PatternList;
