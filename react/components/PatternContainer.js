import React from 'react';
import PatternList from './PatternList';
import PatternInput from './PatternInput';

var id = 0;

class PatternContainer extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      patterns: [
        {
          id: 0,
          name: 'Left Side Pass',
          count: 6
        }, {
          id: 1,
          name: 'Hammer Lock',
          count: 6
        }
      ]
    };
    this.handlePatternAdd = this.handlePatternAdd.bind(this);
  }

  createPattern (name, count) {
    return {
      id: id++,
      name: name,
      count: count
    };
  }

  handlePatternAdd (name, count) {
    let patterns = this.state.patterns.concat(this.createPattern(name, count));
    this.setState({ patterns: patterns });
  }

  render () {
    return (
      <div className="patterns">
        <h3>Patterns</h3>
        <div className="patterns-body">
          <PatternInput handleSubmit={this.handlePatternAdd} />

          <div className="pattern-list">
            <PatternList patterns={this.props.patterns} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = PatternContainer;
