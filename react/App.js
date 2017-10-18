import React from 'react';
import ReactDOM from 'react-dom';
import PatternContainer from './components/PatternContainer';
import Speaker from './components/Speaker';
import Metronome from './components/Metronome';


class App extends React.Component {
  render () {
    return (
      <div>
        <Speaker />
        <PatternContainer />
        <Metronome />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
