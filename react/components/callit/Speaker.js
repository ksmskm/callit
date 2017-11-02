import React from 'react';
import PropTypes from 'prop-types';

class Speaker extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      voices: []
    };
  }

  componentDidMount () {
    speechSynthesis.addEventListener('voiceschanged', () => this.populateVoices());
  }

  populateVoices () {
    this.setState({
      voices: speechSynthesis.getVoices().filter(voice => voice.lang.includes('en'))
    });
  }

  handleVoiceChange (e) {
    this.props.message.voice = this.state.voices[e.target.selectedIndex];
  }

  render () {
    var voices = this.state.voices.map((voice, i) => {
      return <option key={i} value={voice.name}>{voice.name} ({voice.lang})</option>;
    });

    return (
      <div className="speaker">
        <h3>Voice</h3>
        <form action="" name="speaker">
          <select name="voice" id="voice" onChange={this.handleVoiceChange.bind(this)}>
            {voices}
          </select>
        </form>
      </div>
    );
  }
}

Speaker.propTypes = {
  message: PropTypes.object.isRequired
};

module.exports = Speaker;
