let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const msg = new SpeechSynthesisUtterance();

function populateVoices() {
  voices = this.getVoices();
  const voiceOptions = voices
    .filter(voice => voice.lang.includes('en'))
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
  voicesDropdown.innerHTML = voiceOptions;
}

function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
 
 export default msg
