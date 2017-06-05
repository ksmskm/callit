const audio = document.querySelector('audio[data-key="76"]');

let metro

function playSound (frequency) {
  metro = setInterval(function() {
    audio.currentTime = 0;
    audio.play();
  }, frequency);
}  

function stopSound () {
  clearInterval(metro);
}


export { playSound, stopSound };
