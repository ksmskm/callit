const audio = document.querySelector('audio[data-key="76"]');

let timer;
let start;
let interval;
let time;

function instance () {
  time += interval;
  var diff = (new Date().getTime() - start) - time;
  audio.play();
  timer = window.setTimeout(instance, (interval - diff)); 
}

export function click (freq) {
  start = new Date().getTime();
  interval = 60000 / freq; 
  time = 0;
  audio.play();
  timer = window.setTimeout(instance, interval);
}

export function stop () {
  window.clearTimeout(timer);
}
