import React from 'react';
import ReactDOM from 'react-dom';

let id = 2;

class App extends React.Component {
  render () {
    return (
      <div>
        <Speaker />
        <PatternsForm />
        <Metronome />
      </div>
    );
  }
}

class Speaker extends React.Component {
  render () {
    return (
      <div className="speaker">
        <h3>Voice</h3>
        <form action="" name="speaker">
          <select name="voice" id="voice">
            <option defaultValue="">Select a Voice</option>
          </select>
        </form>
      </div>
    );
  }
}

class PatternsForm extends React.Component {

  // onFormSubmit

  constructor (props) {
    super(props);
    this.state = {
      patterns: [
        {
          name: 'Left Side Pass',
          count: 6
        }, {
          name: 'Whip',
          count: 8
        }, {
          name: 'Sugar Push',
          count: 6
        }
      ]
    };
  }

  render () {
    return (
      <div className="patterns">
        <h3>Patterns</h3>
        <div className="patterns-body">
          <div className="pattern-form">
            <form action="" name="patterns" method="post">
              <div className="name">
                <label htmlFor="pattern_name">Name:</label>
                <input type="text" id="pattern_name" name="name" />
              </div>
              <div className="count">
                <label htmlFor="pattern_count">Count:</label>
                <input type="number" id="pattern_count" name="count" step="2" defaultValue="6" min="2" max="16" />
              </div>
              <div className="button">
                <button className="addPattern" type="submit">Submit</button>
              </div>
            </form>
          </div>

          <div className="pattern-list">
            <ul id="pattern-list">
              <Pattern name="Left Side Pass"/>
              <Pattern name="Whip"/>
              <Pattern name="Sugar Push"/>
            </ul>
            <PatternsList />
          </div>
        </div>
      </div>
    );
  }
}

class PatternsList extends React.Component {
  getDefaultProps () {
    return {
      patterns: [
        {
          name: 'Left Side Pass',
          count: 6,
          id: 0
        }, {
          name: 'Whip',
          count: 8,
          id: 1
        }, {
          name: 'Sugar Push',
          count: 6,
          id: 2
        }
      ]
    };
  }

  createTodo (name, count) {
    id++;

    return {
      id: id,
      name: name,
      count: count
    };
  }

  handleTodoAdd (name, count) {
    let pattern = this.createPattern(name, count);

    this.setProps({
      items: this.props.patterns.concat(pattern)
    });
  }

  handleTodoRemoved (pattern) {
    this.setProps({
      todos: this.props.patterns.filter(function (msg) {
        return pattern.id !== msg.id;
      })
    });
  }

  render () {
    var listItems = this.props.patterns.map(function (item, index) {
      return (
        <Pattern key={index} item={item} />
      );
    }.bind(this));

    return (
      <ul>
        {listItems}
      </ul>
    );
  }
}

class Metronome extends React.Component {
  render () {
    return (
      <div className="metronome">
        <h3>Metronome</h3>
        <form action="" name="metronome">
          <div>
            <label htmlFor="bpm">BPM:</label>
            <input type="number" name="bpm" id="bpm" step="2" defaultValue="88" min="60" max="144" />
          </div>
          <div className="button">
            <button className="toggle" type="button">Start/Stop</button>
          </div>
        </form>
      </div>
    );
  }
}

class Pattern extends React.Component {
  render () {
    return (
      <li key={this.props.index}>
        <div className="pattern" data-counts={this.props.item.count}>
          <span>{this.props.item.name}</span>
          <button className="delete" type="button">delete</button>
        </div>
      </li>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
