class Speech {
  constructor (options) {
    this.voices = [];
    this.message = new SpeechSynthesisUtterance();
    this.message.rate = 1.4;
    this.registerDOMNodes();
    this.attachEventListeners();
  }

  registerDOMNodes (options) {
    this.voicesDropdown = document.querySelector('[name="voice"]');
    this.startButton = document.querySelector('.start-voice');
    this.stopButton = document.querySelector('.stop-voice');
  }

  attachEventListeners (options) {
    speechSynthesis.addEventListener('voiceschanged', () => this.populateVoices());
    this.startButton.addEventListener('click', () => {
      const messageText = document.querySelector('[name="pattern"]').value;
      this.speakMsg(messageText);
    });
    // 'native method': speechSynthesis.cancel must be bound to 'window'.
    this.stopButton.addEventListener('click', () => speechSynthesis.cancel());
  }

  populateVoices () {
    this.voices = speechSynthesis.getVoices().filter(voice => voice.lang.includes('en'));
    this.voicesDropdown.innerHTML = this.voices
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  speakMsg (text) {
    speechSynthesis.cancel();
    this.message.voice = this.voices[this.voicesDropdown.selectedIndex];
    this.message.text = text;
    speechSynthesis.speak(this.message);
  }  
}

export default Speech
