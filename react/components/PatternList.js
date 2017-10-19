import React from 'react';
import PropTypes from 'prop-types';
import Pattern from './Pattern';

function PatternList (props) {
  var patterns = props.patterns.map(function (pattern, i) {
    return <Pattern key={i} pattern={pattern} handleRemove={props.handleRemove} />;
  });

  return (
    <div className="pattern-list">
      <ul id="pattern-list" className="list">
        {patterns}
      </ul>
    </div>
  );
}

PatternList.propTypes = {
  patterns: PropTypes.array.isRequired,
  handleRemove: PropTypes.func.isRequired
};

module.exports = PatternList;
