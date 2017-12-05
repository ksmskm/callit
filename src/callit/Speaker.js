import React from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Speaker extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      voices: speechSynthesis.getVoices().filter(voice => voice.lang.includes('en'))
    };
    this.handleVoiceChange = this.handleVoiceChange.bind(this);
  }

  componentDidMount () {
    if ('onvoiceschanged' in speechSynthesis) {
      alert('chrome');
      speechSynthesis.addEventListener('voiceschanged', () => this.populateVoices());
    } else {
      alert('safari');
      this.populateVoices();
    }
  }

  populateVoices () {
    this.setState({
      voices: speechSynthesis.getVoices().filter(voice => voice.lang.includes('en'))
    });
  }

  handleVoiceChange (option) {
    this.props.message.voice = option.value;
    this.setState({ selectedOption: option });    
  }

  render () {
    var voices = this.state.voices.map((voice, i) => {
      return {
        value: voice, 
        label: `${voice.name} (${voice.lang})`
      };
    });

    return (
      <div className="speaker">
        <h3>Voice</h3>
        <form action="" name="speaker">
          <Select
            clearable={false}
            name="voice"
            options={voices}
            value={this.state.selectedOption}
            onChange={this.handleVoiceChange}
          />          
        </form>
      </div>
    );
  }
}

Speaker.propTypes = {
  message: PropTypes.object.isRequired
};

module.exports = Speaker;
