// setup state
import React from 'react';
import PropTypes from 'prop-types';

class Metronome extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      bpm: 88
    };
    
    this.handleBPMChange = this.handleBPMChange.bind(this);  
    this.handleSubmit = this.handleSubmit.bind(this);  
  }

  componentDidMount () {
    this.running = false;
  }

  start () {
    if (this.props.patterns.length === 0) {
      alert('please add patterns!');
    } else {
      this.startTime = new Date().getTime();
      this.pattern = { name: 8, count: 8 }; // count in 8 beats to start.
      this.beat = 1;
      this.elapsed = false;
      this.timeout = this.processInterval();
      this.running = !this.running;
    }
  }

  processInterval () {
    if (this.props.patterns.length === 0) {
      this.stop();
    } else if (this.beat >= this.pattern.count) {
      let i = Math.floor(Math.random() * this.props.patterns.length);      
      this.pattern = this.props.patterns[i];
      this.speakMsg(this.pattern.name);
      this.beat = 1;
    } else {
      this.speakMsg(this.beat);
      this.beat += 1;
    }

    let interval = 60000 / this.state.bpm;

    // handles fencepost case
    if (this.elapsed === false) {
      this.elapsed = 0;
    } else {
      this.elapsed += interval;
    }

    let error = new Date().getTime() - this.startTime - this.elapsed;
    let adjusted = interval - error;
    this.timeout = window.setTimeout(() => this.processInterval(), adjusted);
  }

  stop () {
    window.clearTimeout(this.timeout);
    this.elapsed = false;
    this.running = !this.running;
  }

  speakMsg (text) {
    speechSynthesis.cancel();
    this.props.message.text = text;
    this.props.message.rate = 1.4;    
    speechSynthesis.speak(this.props.message);
  }    

  handleBPMChange (e) {
    this.setState({ bpm: e.target.value });    
  }

  handleSubmit (e) {
    e.preventDefault();
    if (this.running === false) {
      this.start();
    } else {
      this.stop();
    }    
  }

  render () {
    return (
      <div className="metronome">
        <h3>Metronome</h3>
        <form action="" name="metronome" onSubmit={this.handleSubmit} >
          <div>
            <label htmlFor="bpm">BPM:</label>
            <input 
              onChange={this.handleBPMChange} 
              type="number" name="bpm" id="bpm" step="2" 
              value={this.state.bpm} min="60" max="144" />
          </div>
          <div className="button">
            <button className="toggle" type="submit">Start/Stop</button>
          </div>
        </form>
      </div>
    );
  }
}

Metronome.propTypes = {
  message: PropTypes.object.isRequired,
  patterns: PropTypes.array.isRequired
};

module.exports = Metronome;
