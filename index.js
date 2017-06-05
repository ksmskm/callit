import Metronome from './metronome';

const metro = new Metronome({});

const msg = new SpeechSynthesisUtterance();
let voices = [];

const voicesDropdown = document.querySelector('[name="voice"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
const repeatButton = document.querySelector('#repeat');

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

function speakMsg() {
  msg.text = document.querySelector('[name="pattern"]').value;
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
speakButton.addEventListener('click', speakMsg);

// 'native method': speechSynthesis.cancel must be bound to 'window'.
stopButton.addEventListener('click', () => speechSynthesis.cancel());

repeatButton.addEventListener('click', metronome.playSound);

// const options = document.querySelectorAll('[type="range"], [name="text"]');
// function setOption() {
//   msg[this.name] = this.value;
// }
// options.forEach(option => option.addEventListener('change', setOption));
