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
  msg.text = document.querySelector('[name="pattern"]').value;
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

repeatButton.addEventListener('click', metronome.playSound);

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Metronome = function () {
  function Metronome(properties) {
    _classCallCheck(this, Metronome);

    this.properties = properties;
  }

  _createClass(Metronome, [{
    key: 'playSound',
    value: function playSound(e) {
      var audio = document.querySelector('audio[data-key="76"]');
      if (!audio) return;
      audio.currentTime = 0;
      audio.play();
    }
  }]);

  return Metronome;
}();

exports.default = Metronome;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm1ldHJvbm9tZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7OztBQUVBLElBQU0sUUFBUSx3QkFBYyxFQUFkLENBQWQ7O0FBRUEsSUFBTSxNQUFNLElBQUksd0JBQUosRUFBWjtBQUNBLElBQUksU0FBUyxFQUFiOztBQUVBLElBQU0saUJBQWlCLFNBQVMsYUFBVCxDQUF1QixnQkFBdkIsQ0FBdkI7QUFDQSxJQUFNLGNBQWMsU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQXBCO0FBQ0EsSUFBTSxhQUFhLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQUFuQjtBQUNBLElBQU0sZUFBZSxTQUFTLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBckI7O0FBRUEsU0FBUyxjQUFULEdBQTBCO0FBQ3hCLFdBQVMsS0FBSyxTQUFMLEVBQVQ7QUFDQSxNQUFNLGVBQWUsT0FDbEIsTUFEa0IsQ0FDWDtBQUFBLFdBQVMsTUFBTSxJQUFOLENBQVcsUUFBWCxDQUFvQixJQUFwQixDQUFUO0FBQUEsR0FEVyxFQUVsQixHQUZrQixDQUVkO0FBQUEsK0JBQTJCLE1BQU0sSUFBakMsVUFBMEMsTUFBTSxJQUFoRCxVQUF5RCxNQUFNLElBQS9EO0FBQUEsR0FGYyxFQUdsQixJQUhrQixDQUdiLEVBSGEsQ0FBckI7QUFJQSxpQkFBZSxTQUFmLEdBQTJCLFlBQTNCO0FBQ0Q7O0FBRUQsU0FBUyxRQUFULEdBQW9CO0FBQUE7O0FBQ2xCLE1BQUksS0FBSixHQUFZLE9BQU8sSUFBUCxDQUFZO0FBQUEsV0FBUyxNQUFNLElBQU4sS0FBZSxNQUFLLEtBQTdCO0FBQUEsR0FBWixDQUFaO0FBQ0Q7O0FBRUQsU0FBUyxRQUFULEdBQW9CO0FBQ2xCLE1BQUksSUFBSixHQUFXLFNBQVMsYUFBVCxDQUF1QixrQkFBdkIsRUFBMkMsS0FBdEQ7QUFDQSxrQkFBZ0IsTUFBaEI7QUFDQSxrQkFBZ0IsS0FBaEIsQ0FBc0IsR0FBdEI7QUFDRDs7QUFFRCxnQkFBZ0IsZ0JBQWhCLENBQWlDLGVBQWpDLEVBQWtELGNBQWxEO0FBQ0EsZUFBZSxnQkFBZixDQUFnQyxRQUFoQyxFQUEwQyxRQUExQztBQUNBLFlBQVksZ0JBQVosQ0FBNkIsT0FBN0IsRUFBc0MsUUFBdEM7O0FBRUE7QUFDQSxXQUFXLGdCQUFYLENBQTRCLE9BQTVCLEVBQXFDO0FBQUEsU0FBTSxnQkFBZ0IsTUFBaEIsRUFBTjtBQUFBLENBQXJDOztBQUVBLGFBQWEsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMsVUFBVSxTQUFqRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0lDNUNNLFM7QUFDSixxQkFBYSxVQUFiLEVBQXlCO0FBQUE7O0FBQ3ZCLFNBQUssVUFBTCxHQUFrQixVQUFsQjtBQUNEOzs7OzhCQUVVLEMsRUFBRztBQUNaLFVBQU0sUUFBUSxTQUFTLGFBQVQsQ0FBdUIsc0JBQXZCLENBQWQ7QUFDQSxVQUFJLENBQUMsS0FBTCxFQUFZO0FBQ1osWUFBTSxXQUFOLEdBQW9CLENBQXBCO0FBQ0EsWUFBTSxJQUFOO0FBQ0Q7Ozs7OztrQkFHWSxTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBNZXRyb25vbWUgZnJvbSAnLi9tZXRyb25vbWUnO1xuXG5jb25zdCBtZXRybyA9IG5ldyBNZXRyb25vbWUoe30pO1xuXG5jb25zdCBtc2cgPSBuZXcgU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlKCk7XG5sZXQgdm9pY2VzID0gW107XG5cbmNvbnN0IHZvaWNlc0Ryb3Bkb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW25hbWU9XCJ2b2ljZVwiXScpO1xuY29uc3Qgc3BlYWtCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3BlYWsnKTtcbmNvbnN0IHN0b3BCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RvcCcpO1xuY29uc3QgcmVwZWF0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JlcGVhdCcpO1xuXG5mdW5jdGlvbiBwb3B1bGF0ZVZvaWNlcygpIHtcbiAgdm9pY2VzID0gdGhpcy5nZXRWb2ljZXMoKTtcbiAgY29uc3Qgdm9pY2VPcHRpb25zID0gdm9pY2VzXG4gICAgLmZpbHRlcih2b2ljZSA9PiB2b2ljZS5sYW5nLmluY2x1ZGVzKCdlbicpKVxuICAgIC5tYXAodm9pY2UgPT4gYDxvcHRpb24gdmFsdWU9XCIke3ZvaWNlLm5hbWV9XCI+JHt2b2ljZS5uYW1lfSAoJHt2b2ljZS5sYW5nfSk8L29wdGlvbj5gKVxuICAgIC5qb2luKCcnKTtcbiAgdm9pY2VzRHJvcGRvd24uaW5uZXJIVE1MID0gdm9pY2VPcHRpb25zO1xufVxuXG5mdW5jdGlvbiBzZXRWb2ljZSgpIHtcbiAgbXNnLnZvaWNlID0gdm9pY2VzLmZpbmQodm9pY2UgPT4gdm9pY2UubmFtZSA9PT0gdGhpcy52YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHNwZWFrTXNnKCkge1xuICBtc2cudGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwicGF0dGVyblwiXScpLnZhbHVlO1xuICBzcGVlY2hTeW50aGVzaXMuY2FuY2VsKCk7XG4gIHNwZWVjaFN5bnRoZXNpcy5zcGVhayhtc2cpO1xufVxuXG5zcGVlY2hTeW50aGVzaXMuYWRkRXZlbnRMaXN0ZW5lcigndm9pY2VzY2hhbmdlZCcsIHBvcHVsYXRlVm9pY2VzKTtcbnZvaWNlc0Ryb3Bkb3duLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHNldFZvaWNlKTtcbnNwZWFrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3BlYWtNc2cpO1xuXG4vLyAnbmF0aXZlIG1ldGhvZCc6IHNwZWVjaFN5bnRoZXNpcy5jYW5jZWwgbXVzdCBiZSBib3VuZCB0byAnd2luZG93Jy5cbnN0b3BCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzcGVlY2hTeW50aGVzaXMuY2FuY2VsKCkpO1xuXG5yZXBlYXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBtZXRyb25vbWUucGxheVNvdW5kKTtcblxuLy8gY29uc3Qgb3B0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0eXBlPVwicmFuZ2VcIl0sIFtuYW1lPVwidGV4dFwiXScpO1xuLy8gZnVuY3Rpb24gc2V0T3B0aW9uKCkge1xuLy8gICBtc2dbdGhpcy5uYW1lXSA9IHRoaXMudmFsdWU7XG4vLyB9XG4vLyBvcHRpb25zLmZvckVhY2gob3B0aW9uID0+IG9wdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBzZXRPcHRpb24pKTtcbiIsImNsYXNzIE1ldHJvbm9tZSB7XG4gIGNvbnN0cnVjdG9yIChwcm9wZXJ0aWVzKSB7XG4gICAgdGhpcy5wcm9wZXJ0aWVzID0gcHJvcGVydGllcztcbiAgfVxuXG4gIHBsYXlTb3VuZCAoZSkge1xuICAgIGNvbnN0IGF1ZGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXVkaW9bZGF0YS1rZXk9XCI3NlwiXScpO1xuICAgIGlmICghYXVkaW8pIHJldHVybjtcbiAgICBhdWRpby5jdXJyZW50VGltZSA9IDA7XG4gICAgYXVkaW8ucGxheSgpO1xuICB9ICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgTWV0cm9ub21lO1xuIl19
