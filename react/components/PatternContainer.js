import React from 'react';
import PropTypes from 'prop-types';
import PatternList from './PatternList';
import PatternInput from './PatternInput';

function PatternContainer (props) {
  return (
    <div className="patterns">
      <h3>Patterns</h3>
      <div className="patterns-body">
        <PatternInput handleSubmit={props.handleAdd} />
        <PatternList patterns={props.patterns} handleRemove={props.handleRemove} />
      </div>
    </div>
  );
}

PatternContainer.propTypes = {
  patterns: PropTypes.array.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
};

module.exports = PatternContainer;
