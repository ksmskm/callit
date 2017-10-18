import React from 'react';

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

module.exports = Metronome;
