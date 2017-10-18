import React from 'react';
import PatternList from './PatternList';
import PatternInput from './PatternInput';

window.id = 2;

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
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleAdd (name, count) {
    let pattern = {
      id: window.id++,
      name: name,
      count: count
    };
    this.state.patterns.push(pattern);
    this.setState({ patterns: this.state.patterns });
  }

  handleRemove (id) {
    const remainder = this.state.patterns.filter((pattern) => {
      if (pattern.id !== id) return pattern;
    });
    this.setState({ patterns: remainder });
  }

  render () {
    return (
      <div className="patterns">
        <h3>Patterns</h3>
        <div className="patterns-body">
          <PatternInput handleSubmit={this.handleAdd} />

          <div className="pattern-list">
            <PatternList patterns={this.state.patterns} handleRemove={this.handleRemove} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = PatternContainer;
