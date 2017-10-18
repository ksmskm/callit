import React from 'react';
import ReactDOM from 'react-dom';
import PatternContainer from './components/PatternContainer';
import Speaker from './components/Speaker';
import Metronome from './components/Metronome';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    	message: new SpeechSynthesisUtterance(),
      patterns: [
        {
          name: 'Left Side Pass',
          count: 6
        }, {
          name: 'Hammer Lock',
          count: 6
        }, {
          name: 'Whip',
          count: 8
        }
      ]
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleAdd (name, count) {
    let pattern = {
      name: name,
      count: count
    };
    this.state.patterns.push(pattern);
    this.setState({ patterns: this.state.patterns });
  }

  handleRemove (name) {
    const remainder = this.state.patterns.filter((pattern) => {
      if (pattern.name !== name) return pattern;
    });
    this.setState({ patterns: remainder });
  }

  render () {
    return (
      <div>
        <Speaker message={this.state.message} />
        <PatternContainer 
        	patterns={this.state.patterns}
        	handleAdd={this.handleAdd} 
        	handleRemove={this.handleRemove}
        />
        <Metronome 
        	patterns={this.state.patterns} 
        	message={this.state.message}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
