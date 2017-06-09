// BASED ON: sitepoint.com/creating-accurate-timers-in-javascript/
import Speech from './speech';
import Patterns from './patterns';

class Metronome {
  constructor () {
    this.registerDOMNodes();
    this.attachEventListeners();
    this.speech = new Speech();
    this.patterns = new Patterns();
  }

  registerDOMNodes () {
    this.bpm = document.querySelector('[name="bpm"]');
    this.startButton = document.querySelector('.start-metro');
    this.stopButton = document.querySelector('.stop-metro');
  }

  attachEventListeners () {
    this.startButton.addEventListener('click', () => this.start(this.bpm.value));
    this.stopButton.addEventListener('click', () => this.stop());    
  }

  processInterval () {
    this.callPattern();
    
    this.elapsed += this.interval;
    let error = new Date().getTime() - this.initialTime - this.elapsed;
    let correctedInterval = this.interval - error;

    this.timeout = window.setTimeout(() => this.processInterval(), correctedInterval);     
  }

  start (freq) {
    this.startButton.disabled = true;

    this.initialTime = new Date().getTime();
    this.interval = 60000 / freq; 
    this.elapsed = 0;
    this.beat = 1;
    this.callPattern();

    this.timeout = window.setTimeout(() => this.processInterval(), this.interval);
  }  

  callPattern () {
    let pattern = this.patterns.currentPattern;
    if (this.beat === pattern.count) {
      this.speech.speakMsg(pattern.name);
      this.patterns.setPattern();
    } else {
      this.speech.speakMsg(this.beat);
    }
    this.beat %= pattern.count;
    this.beat += 1;
  }

  stop () {
    window.clearTimeout(this.timeout);
    this.startButton.disabled = false;
  }  
}

export default Metronome
