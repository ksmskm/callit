import Metro from './metronome';
import msg from './voices';

const frequencyInput = document.querySelector('[name="bpm"]');
const startVoiceButton = document.querySelector('.start-voice');
const stopVoiceButton = document.querySelector('.stop-voice');
const startMetronomeButton = document.querySelector('.start-metro');
const stopMetronomeButton = document.querySelector('.stop-metro');

const audio = document.querySelector('audio[data-key="76"]');
const metronome = new Metro({audio: audio});

function speakMsg() {
  msg.text = document.querySelector('[name="pattern"]').value;
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

startVoiceButton.addEventListener('click', speakMsg);

// 'native method': speechSynthesis.cancel must be bound to 'window'.
stopVoiceButton.addEventListener('click', () => speechSynthesis.cancel());
stopMetronomeButton.addEventListener('click', function() {
  startMetronomeButton.disabled = false;
  metronome.stop();
});

startMetronomeButton.addEventListener('click', function () {
  metronome.click(frequencyInput.value);
  this.disabled = true;
});

