import React from 'react';
import PropTypes from 'prop-types';
import Pattern from './Pattern';

class PatternList extends React.Component {
  render () {
    var patterns = [];

    patterns = this.props.patterns.map((function (pattern) {
      // Each List Item Component needs a key attribute for uniqueness:
      // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
      return <Pattern key={pattern.id} pattern={pattern} />;
    }).bind(this));

    return (
      <ul id="pattern-list" className="list">
        {patterns}
      </ul>
    );
  }
}

PatternList.propTypes = {
  patterns: PropTypes.list.isRequired
};

module.exports = PatternList;
