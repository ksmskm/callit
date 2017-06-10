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
    this.elapsed = 0;
    
    this.current_beat = 1;
    this.last_beat = 8;
    
    this.timeout = window.setTimeout(() => this.processInterval(), this.interval);

    this.startButton.disabled = true;
  }  

  processInterval () {
    if (this.current_beat === this.last_beat) {  
      this.patterns.setPattern();
      this.speech.speakMsg(this.patterns.currentPattern.name);
      this.current_beat = 0;
      this.last_beat = this.patterns.currentPattern.count;    
    } else {
      this.speech.speakMsg(this.current_beat);
    }
    
    this.current_beat += 1;          
    this.elapsed += this.interval;
    let error = new Date().getTime() - this.initialTime - this.elapsed;
    let correctedInterval = this.interval - error;

    this.timeout = window.setTimeout(() => this.processInterval(), correctedInterval);     
  }

  stop () {
    window.clearTimeout(this.timeout);
    this.startButton.disabled = false;
  }  
}

export default Metronome
