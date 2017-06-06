// BASED ON: sitepoint.com/creating-accurate-timers-in-javascript/

class Metronome {
  constructor(options) {
    this.audio = options.audio;
  }

  timer () {
    this.audio.play();
    this.time += this.interval;
    let diff = new Date().getTime() - this.start - this.time;
    this.timeout = window.setTimeout(() => {
      this.timer()
    }, this.interval - diff);     
  }

  click (freq) {
    this.start = new Date().getTime();
    this.interval = 60000 / freq; 
    this.time = 0;
    this.audio.play();
    this.timeout = window.setTimeout(() => {
      this.timer()
    }, this.interval);
  }  

  stop () {
    window.clearTimeout(this.timeout);
  }  
}

export default Metronome
