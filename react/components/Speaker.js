import React from 'react';
import PropTypes from 'prop-types';

class Speaker extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      voices: []
    };
  
    this.setupMessage = this.setupMessage.bind(this);
    this.registerDOMNodes = this.registerDOMNodes.bind(this);
    this.attachEventListeners = this.attachEventListeners.bind(this);
    this.populateVoices = this.populateVoices.bind(this);
    this.handleVoiceChange = this.handleVoiceChange.bind(this);
  }

  componentDidMount () {
    this.registerDOMNodes();
    this.attachEventListeners();
    this.setupMessage();
  }

  setupMessage () {
    this.props.message.rate = 1.4;
  }

  registerDOMNodes (options) {
    this.voicesDropdown = document.querySelector('[name="voice"]');
    this.toggleButton = document.querySelector('.speaker button.toggle');
  }

  attachEventListeners (options) {
    speechSynthesis.addEventListener('voiceschanged', () => this.populateVoices());
  }

  populateVoices () {
    this.setState({
      voices: speechSynthesis.getVoices().filter(voice => voice.lang.includes('en'))
    });
    this.voicesDropdown.innerHTML = this.state.voices
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  handleVoiceChange (e) {
    this.props.message.voice = this.state.voices[this.voicesDropdown.selectedIndex];
  }

  render () {
    return (
      <div className="speaker">
        <h3>Voice</h3>
        <form action="" name="speaker">
          <select name="voice" id="voice" onChange={this.handleVoiceChange}>
            <option defaultValue="">Select a Voice</option>
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
