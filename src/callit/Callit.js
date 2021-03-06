import React from 'react';

import PatternContainer from './PatternContainer';
import Speaker from './Speaker';
import Metronome from './Metronome';

import '../../dist/css/callit.css';

class Callit extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    	message: new SpeechSynthesisUtterance(),
      patterns: [
        {
          name: 'left side pass',
          count: 6
        }, {
          name: 'hammer lock',
          count: 6
        }, {
          name: 'whip',
          count: 8
        }
      ]
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleAdd (name, count) {
    let pattern = {
      name: name.toLowerCase(),
      count: count
    };

    let names = this.state.patterns.map(pattern => pattern.name);
    
    if (names.includes(pattern.name)) {
    	alert('duplicate');
    } else {    	
	    this.state.patterns.push(pattern);
	    this.setState((prevState) => {
	    	return { patterns: prevState.patterns };
	    });
    }
  }

  handleRemove (name) {
    this.setState((prevState) => {	    
	    let remainder = prevState.patterns.filter((pattern) => {
	      if (pattern.name !== name) return pattern;
	    });    	
    	return { patterns: remainder };
    });
  }

  render () {
    return (    
      <div className="main">
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

export default Callit;
