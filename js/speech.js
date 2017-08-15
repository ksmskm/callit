class Speech {
  constructor (options) {
    this.voices = [];
    this.registerDOMNodes();
    this.attachEventListeners();
    this.setupMessage();
  }

  setupMessage () {
    this.message = new SpeechSynthesisUtterance();
    this.message.rate = 1.4;
  }  

  registerDOMNodes (options) {
    this.voicesDropdown = document.querySelector('[name="voice"]');
    this.toggleButton = document.querySelector('.speaker button.toggle');
  }

  attachEventListeners (options) {
    speechSynthesis.addEventListener('voiceschanged', () => this.populateVoices());

    // this.toggleButton.addEventListener('click', () => {
    //   if (!speechSynthesis.speaking) {
    //     const messageText = document.querySelector('input#phrase').value;
    //     this.speakMsg(messageText);        
    //   } else {
    //     // 'native method': speechSynthesis.cancel must be bound to 'window'.
    //     speechSynthesis.cancel();        
    //   }
    // });
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
