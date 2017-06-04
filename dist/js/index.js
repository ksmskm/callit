(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _metronome = require('./metronome');

var _metronome2 = _interopRequireDefault(_metronome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var metro = new _metronome2.default({});

var msg = new SpeechSynthesisUtterance();
var voices = [];
var voicesDropdown = document.querySelector('[name="voice"]');
var speakButton = document.querySelector('#speak');
var stopButton = document.querySelector('#stop');
var repeatButton = document.querySelector('#repeat');
msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
  voices = this.getVoices();
  var voiceOptions = voices.filter(function (voice) {
    return voice.lang.includes('en');
  }).map(function (voice) {
    return '<option value="' + voice.name + '">' + voice.name + ' (' + voice.lang + ')</option>';
  }).join('');
  voicesDropdown.innerHTML = voiceOptions;
}

function setVoice() {
  var _this = this;

  msg.voice = voices.find(function (voice) {
    return voice.name === _this.value;
  });
}

function speakMsg() {
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
speakButton.addEventListener('click', speakMsg);

// 'native method': speechSynthesis.cancel must be bound to 'window'.
stopButton.addEventListener('click', function () {
  return speechSynthesis.cancel();
});

// const options = document.querySelectorAll('[type="range"], [name="text"]');
// function setOption() {
//   msg[this.name] = this.value;
// }
// options.forEach(option => option.addEventListener('change', setOption));

},{"./metronome":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Metronome = function Metronome(properties) {
  _classCallCheck(this, Metronome);

  console.log('metronome!!');
  this.properties = properties;
};

exports.default = Metronome;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm1ldHJvbm9tZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7OztBQUVBLElBQU0sUUFBUSx3QkFBYyxFQUFkLENBQWQ7O0FBRUEsSUFBTSxNQUFNLElBQUksd0JBQUosRUFBWjtBQUNBLElBQUksU0FBUyxFQUFiO0FBQ0EsSUFBTSxpQkFBaUIsU0FBUyxhQUFULENBQXVCLGdCQUF2QixDQUF2QjtBQUNBLElBQU0sY0FBYyxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBcEI7QUFDQSxJQUFNLGFBQWEsU0FBUyxhQUFULENBQXVCLE9BQXZCLENBQW5CO0FBQ0EsSUFBTSxlQUFlLFNBQVMsYUFBVCxDQUF1QixTQUF2QixDQUFyQjtBQUNBLElBQUksSUFBSixHQUFXLFNBQVMsYUFBVCxDQUF1QixlQUF2QixFQUF3QyxLQUFuRDs7QUFFQSxTQUFTLGNBQVQsR0FBMEI7QUFDeEIsV0FBUyxLQUFLLFNBQUwsRUFBVDtBQUNBLE1BQU0sZUFBZSxPQUNsQixNQURrQixDQUNYO0FBQUEsV0FBUyxNQUFNLElBQU4sQ0FBVyxRQUFYLENBQW9CLElBQXBCLENBQVQ7QUFBQSxHQURXLEVBRWxCLEdBRmtCLENBRWQ7QUFBQSwrQkFBMkIsTUFBTSxJQUFqQyxVQUEwQyxNQUFNLElBQWhELFVBQXlELE1BQU0sSUFBL0Q7QUFBQSxHQUZjLEVBR2xCLElBSGtCLENBR2IsRUFIYSxDQUFyQjtBQUlBLGlCQUFlLFNBQWYsR0FBMkIsWUFBM0I7QUFDRDs7QUFFRCxTQUFTLFFBQVQsR0FBb0I7QUFBQTs7QUFDbEIsTUFBSSxLQUFKLEdBQVksT0FBTyxJQUFQLENBQVk7QUFBQSxXQUFTLE1BQU0sSUFBTixLQUFlLE1BQUssS0FBN0I7QUFBQSxHQUFaLENBQVo7QUFDRDs7QUFFRCxTQUFTLFFBQVQsR0FBb0I7QUFDbEIsa0JBQWdCLE1BQWhCO0FBQ0Esa0JBQWdCLEtBQWhCLENBQXNCLEdBQXRCO0FBQ0Q7O0FBRUQsZ0JBQWdCLGdCQUFoQixDQUFpQyxlQUFqQyxFQUFrRCxjQUFsRDtBQUNBLGVBQWUsZ0JBQWYsQ0FBZ0MsUUFBaEMsRUFBMEMsUUFBMUM7QUFDQSxZQUFZLGdCQUFaLENBQTZCLE9BQTdCLEVBQXNDLFFBQXRDOztBQUVBO0FBQ0EsV0FBVyxnQkFBWCxDQUE0QixPQUE1QixFQUFxQztBQUFBLFNBQU0sZ0JBQWdCLE1BQWhCLEVBQU47QUFBQSxDQUFyQzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztJQzFDTSxTLEdBQ0osbUJBQWEsVUFBYixFQUF5QjtBQUFBOztBQUN2QixVQUFRLEdBQVIsQ0FBWSxhQUFaO0FBQ0EsT0FBSyxVQUFMLEdBQWtCLFVBQWxCO0FBQ0QsQzs7a0JBR1ksUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgTWV0cm9ub21lIGZyb20gJy4vbWV0cm9ub21lJztcblxuY29uc3QgbWV0cm8gPSBuZXcgTWV0cm9ub21lKHt9KTtcblxuY29uc3QgbXNnID0gbmV3IFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSgpO1xubGV0IHZvaWNlcyA9IFtdO1xuY29uc3Qgdm9pY2VzRHJvcGRvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cInZvaWNlXCJdJyk7XG5jb25zdCBzcGVha0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzcGVhaycpO1xuY29uc3Qgc3RvcEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdG9wJyk7XG5jb25zdCByZXBlYXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVwZWF0Jyk7XG5tc2cudGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwidGV4dFwiXScpLnZhbHVlO1xuXG5mdW5jdGlvbiBwb3B1bGF0ZVZvaWNlcygpIHtcbiAgdm9pY2VzID0gdGhpcy5nZXRWb2ljZXMoKTtcbiAgY29uc3Qgdm9pY2VPcHRpb25zID0gdm9pY2VzXG4gICAgLmZpbHRlcih2b2ljZSA9PiB2b2ljZS5sYW5nLmluY2x1ZGVzKCdlbicpKVxuICAgIC5tYXAodm9pY2UgPT4gYDxvcHRpb24gdmFsdWU9XCIke3ZvaWNlLm5hbWV9XCI+JHt2b2ljZS5uYW1lfSAoJHt2b2ljZS5sYW5nfSk8L29wdGlvbj5gKVxuICAgIC5qb2luKCcnKTtcbiAgdm9pY2VzRHJvcGRvd24uaW5uZXJIVE1MID0gdm9pY2VPcHRpb25zO1xufVxuXG5mdW5jdGlvbiBzZXRWb2ljZSgpIHtcbiAgbXNnLnZvaWNlID0gdm9pY2VzLmZpbmQodm9pY2UgPT4gdm9pY2UubmFtZSA9PT0gdGhpcy52YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHNwZWFrTXNnKCkge1xuICBzcGVlY2hTeW50aGVzaXMuY2FuY2VsKCk7XG4gIHNwZWVjaFN5bnRoZXNpcy5zcGVhayhtc2cpO1xufVxuXG5zcGVlY2hTeW50aGVzaXMuYWRkRXZlbnRMaXN0ZW5lcigndm9pY2VzY2hhbmdlZCcsIHBvcHVsYXRlVm9pY2VzKTtcbnZvaWNlc0Ryb3Bkb3duLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHNldFZvaWNlKTtcbnNwZWFrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3BlYWtNc2cpO1xuXG4vLyAnbmF0aXZlIG1ldGhvZCc6IHNwZWVjaFN5bnRoZXNpcy5jYW5jZWwgbXVzdCBiZSBib3VuZCB0byAnd2luZG93Jy5cbnN0b3BCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzcGVlY2hTeW50aGVzaXMuY2FuY2VsKCkpO1xuXG5cbi8vIGNvbnN0IG9wdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbdHlwZT1cInJhbmdlXCJdLCBbbmFtZT1cInRleHRcIl0nKTtcbi8vIGZ1bmN0aW9uIHNldE9wdGlvbigpIHtcbi8vICAgbXNnW3RoaXMubmFtZV0gPSB0aGlzLnZhbHVlO1xuLy8gfVxuLy8gb3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiBvcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgc2V0T3B0aW9uKSk7XG4iLCJjbGFzcyBNZXRyb25vbWUge1xuICBjb25zdHJ1Y3RvciAocHJvcGVydGllcykge1xuICAgIGNvbnNvbGUubG9nKCdtZXRyb25vbWUhIScpO1xuICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWV0cm9ub21lO1xuIl19
