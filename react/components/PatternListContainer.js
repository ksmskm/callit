import React from 'react';
import PropTypes from 'prop-types';
import PatternList from './PatternList';
import PatternInput from './PatternInput';

var id = 0;

class PatternContainer extends React.Component {

  getDefaultProps () {
    return {
      patterns: [
        this.createPattern('Left Side Pass', 6),
        this.createPattern('Hammer Lock', 6)
      ]
    };
  }

  createPattern (name, count) {
    return {
      id: id++,
      name: name,
      count: count
    };
  }

  handlePatternAdd (name, count) {
    this.setProps({
      todos: this.props.patterns.concat(this.createPattern(name, count))
    });
  }

  handlePatternRemoved (pattern) {
    this.setProps({
      patterns: this.props.patterns.filter(function (msg) {
        return pattern.id !== msg.id;
      })
    });
  }

  render () {
    return (
      <div className="patterns">
        <h3>Patterns</h3>
        <div className="patterns-body">
          <PatternInput onInputSubmit={this.handlePatternAdd} />

          <div className="pattern-list">
            <PatternList patterns={this.props.patterns} />
          </div>
        </div>
      </div>
    );
  }
}

PatternContainer.propTypes = {
  patterns: PropTypes.list
};

module.exports = PatternContainer;
