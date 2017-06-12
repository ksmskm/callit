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

  start (freq) {
    this.initialTime = new Date().getTime();
    this.interval = 60000 / freq; 
    
    this.pattern = { name: 8, count: 8 };
    this.beat = 1;
    this.elapsed = false;
    
    // this.timeout = window.setTimeout(() => this.processInterval(), this.interval);
    this.timeout = this.processInterval();
    this.startButton.disabled = true;
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

    this.elapsed = this.elapsed === false ? 0 : this.elapsed + this.interval;

    let error = new Date().getTime() - this.initialTime - this.elapsed;
    let adjusted = this.interval - error;

    this.timeout = window.setTimeout(() => this.processInterval(), adjusted);     
  }

  stop () {
    window.clearTimeout(this.timeout);
    this.startButton.disabled = false;
    this.elapsed = false;
  }  
}

export default Metronome
