import { playSound, stopSound } from './metronome';

const msg = new SpeechSynthesisUtterance();
let voices = [];

const voicesDropdown = document.querySelector('[name="voice"]');
const frequencyInput = document.querySelector('[name="bpm"]');
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
stopButton.addEventListener('click', stopSound);

repeatButton.addEventListener('click', () => {
  let frequency = frequencyInput.value;
  playSound(60000 / frequency);
});

// const options = document.querySelectorAll('[type="range"], [name="text"]');
// function setOption() {
//   msg[this.name] = this.value;
// }
// options.forEach(option => option.addEventListener('change', setOption));
