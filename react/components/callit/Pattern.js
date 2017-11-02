import React from 'react';
import PropTypes from 'prop-types';

function Pattern (props) {
  return (
    <li>
      <div className="pattern">
        <span>{props.pattern.name}</span>
        <button 
          onClick={() => props.handleRemove(props.pattern.name)} 
          className="delete">delete</button>
      </div>
    </li>
  );
}

Pattern.propTypes = {
  pattern: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired
};

module.exports = Pattern;
