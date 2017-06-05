class Metronome {
  constructor (properties) {
    this.properties = properties;
  }

  playSound (e) {
    const audio = document.querySelector('audio[data-key="76"]');
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
  }  
}

export default Metronome;
