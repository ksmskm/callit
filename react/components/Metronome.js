// setup state
import React from 'react';
import PropTypes from 'prop-types';

class Metronome extends React.Component {
  constructor (props) {
    super(props);

    this.start = this.start.bind(this);    
    this.processInterval = this.processInterval.bind(this);    
    this.stop = this.stop.bind(this);    
    this.speakMsg = this.speakMsg.bind(this); 
    this.handleBPMChange = this.handleBPMChange.bind(this);  
    this.handleSubmit = this.handleSubmit.bind(this);  
  }

  componentDidMount () {
    this.running = false;
    this.interval = 60000 / 88;
  }

  start () {
    if (this.props.patterns.length === 0) {
      alert('please add patterns!');
    } else {
      this.initialTime = new Date().getTime();
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
      let i = Math.floor(Math.random() * Object.keys(this.props.patterns).length);      
      this.pattern = this.props.patterns[i];
      this.speakMsg(this.pattern.name);
      this.beat = 1;
    } else {
      this.speakMsg(this.beat);
      this.beat += 1;
    }

    this.elapsed = this.elapsed === false ? 0 : this.elapsed + this.interval; // handles fencepost case
    let error = new Date().getTime() - this.initialTime - this.elapsed;
    let adjusted = this.interval - error;
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
    speechSynthesis.speak(this.props.message);
  }    

  handleBPMChange (e) {
    this.interval = 60000 / e.target.value;
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
            <input onChange={this.handleBPMChange} type="number" name="bpm" id="bpm" step="2" defaultValue="88" min="60" max="144" />
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
