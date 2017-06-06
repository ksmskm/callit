const audio = document.querySelector('audio[data-key="76"]');

let running;
let start;
let interval;
let time;

function instance () {
  if (running === true) {
    time += interval;
    var diff = (new Date().getTime() - start) - time;
    audio.play();
    window.setTimeout(instance, (interval - diff)); 
  }
}

export function click (freq) {
  running = true;
  start = new Date().getTime();
  interval = 60000 / freq; 
  time = 0;
  audio.play();
  window.setTimeout(instance, interval);
}

export function stop () {
  running = false;
}
