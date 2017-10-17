// TIMING INTERVAL BASED ON: sitepoint.com/creating-accurate-timers-in-javascript/
import Speech from './speech';
import Patterns from './patterns';

class Metronome {
  constructor (options) {
    this.registerDOMNodes();
    this.attachEventListeners();
    this.speech = new Speech();
    this.patterns = new Patterns();
    this.running = false;
  }

  registerDOMNodes () {
    this.bpm = document.querySelector('input#bpm');
    this.toggleButton = document.querySelector('.metronome button.toggle');
  }

  attachEventListeners () {
    this.toggleButton.addEventListener('click', () => {
      if (this.running === false) {
        this.start(this.bpm.value);
      } else {
        this.stop();
      }
      this.running = !this.running;
    });
  }

  start (freq) {
    if (Object.keys(this.patterns.patterns).length === 0) {
      alert('please add patterns');
    } else {
      this.initialTime = new Date().getTime();
      this.interval = 60000 / freq;
      this.pattern = { name: 8, count: 8 }; // count in 8 beats to start.
      this.beat = 1;
      this.elapsed = false;
      this.timeout = this.processInterval();
    }
  }

  processInterval () {
    if (this.beat === this.pattern.count) {
      this.pattern = this.patterns.randomPattern();
      this.speech.speakMsg(this.pattern.name);
      this.beat = 1;
    } else {
      this.speech.speakMsg(this.beat);
      this.beat += 1;
    }

    this.elapsed = this.elapsed === false ? 0 : this.elapsed + this.interval; // handles fencepost case
    let error = new Date().getTime() - this.initialTime - this.elapsed;
    let adjusted = this.interval - error;
    this.timeout = window.setTimeout(() => this.processInterval(), adjusted);
  }

  stop () {
    window.clearTimeout(this.timeout);
    this.elapsed = false;
  }
}

export default Metronome;
