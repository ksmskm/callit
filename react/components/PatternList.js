import React from 'react';
import PropTypes from 'prop-types';
import Pattern from './Pattern';

class PatternList extends React.Component {

  render () {
    var patterns = this.props.patterns.map((function (pattern, index) {
      // Each List Item Component needs a key attribute for uniqueness:
      // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
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
  patterns: PropTypes.array,
  handleRemove: PropTypes.func
};

module.exports = PatternList;
