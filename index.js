import Metro from './metronome';
import msg from './voices';

const frequencyInput = document.querySelector('[name="bpm"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
const repeatButton = document.querySelector('#repeat');

const audio = document.querySelector('audio[data-key="76"]');
const metro = new Metro({audio: audio});

function speakMsg() {
  msg.text = document.querySelector('[name="pattern"]').value;
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

speakButton.addEventListener('click', speakMsg);

// 'native method': speechSynthesis.cancel must be bound to 'window'.
stopButton.addEventListener('click', () => speechSynthesis.cancel());
stopButton.addEventListener('click', function() {
  repeatButton.disabled = false;
  metro.stop();
});

repeatButton.addEventListener('click', function () {
  metro.click(frequencyInput.value);
  this.disabled = true;
});

