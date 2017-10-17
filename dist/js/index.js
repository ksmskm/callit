(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _metronome = require('./metronome');

var _metronome2 = _interopRequireDefault(_metronome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var metro = new _metronome2.default();

},{"./metronome":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // TIMING INTERVAL BASED ON: sitepoint.com/creating-accurate-timers-in-javascript/


var _speech = require('./speech');

var _speech2 = _interopRequireDefault(_speech);

var _patterns = require('./patterns');

var _patterns2 = _interopRequireDefault(_patterns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Metronome = function () {
  function Metronome(options) {
    _classCallCheck(this, Metronome);

    this.registerDOMNodes();
    this.attachEventListeners();
    this.speech = new _speech2.default();
    this.patterns = new _patterns2.default();
    this.running = false;
  }

  _createClass(Metronome, [{
    key: 'registerDOMNodes',
    value: function registerDOMNodes() {
      this.bpm = document.querySelector('input#bpm');
      this.toggleButton = document.querySelector('.metronome button.toggle');
    }
  }, {
    key: 'attachEventListeners',
    value: function attachEventListeners() {
      var _this = this;

      this.toggleButton.addEventListener('click', function () {
        if (_this.running === false) {
          _this.start(_this.bpm.value);
        } else {
          _this.stop();
        }
        _this.running = !_this.running;
      });
    }
  }, {
    key: 'start',
    value: function start(freq) {
      if (Object.keys(this.patterns.patterns).length === 0) {
        alert('please add patterns');
      } else {
        this.initialTime = new Date().getTime();
        this.interval = 60000 / freq;
        this.pattern = { name: 8, count: 8 }; // count in 8 beats to start.
        this.beat = 1;
        this.elapsed = false;
        this.timeout = this.processInterval();
      }
    }
  }, {
    key: 'processInterval',
    value: function processInterval() {
      var _this2 = this;

      if (this.beat === this.pattern.count) {
        this.pattern = this.patterns.randomPattern();
        this.speech.speakMsg(this.pattern.name);
        this.beat = 1;
      } else {
        this.speech.speakMsg(this.beat);
        this.beat += 1;
      }

      this.elapsed = this.elapsed === false ? 0 : this.elapsed + this.interval; // handles fencepost case
      var error = new Date().getTime() - this.initialTime - this.elapsed;
      var adjusted = this.interval - error;
      this.timeout = window.setTimeout(function () {
        return _this2.processInterval();
      }, adjusted);
    }
  }, {
    key: 'stop',
    value: function stop() {
      window.clearTimeout(this.timeout);
      this.elapsed = false;
    }
  }]);

  return Metronome;
}();

exports.default = Metronome;

},{"./patterns":4,"./speech":5}],3:[function(require,module,exports){
module.exports={
  "push": {
    name: "push",
    count: 6
  }, 
  "pass": {
    name: "pass",
    count: 6
  }, 
  "turn": {
    name: "turn",
    count: 6
  },
  "whip": {
    name: "whip",
    count: 8
  },
  "telemark": {
    name: "telemark",
    count: 8
  }  
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _patterns = require('./patterns.json');

var _patterns2 = _interopRequireDefault(_patterns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Patterns = function () {
  function Patterns() {
    var _this = this;

    _classCallCheck(this, Patterns);

    this.patterns = _patterns2.default;
    this.listItemTmpl = document.getElementById('pattern-list-view').import.querySelector('template');
    this.patternListView = document.getElementById('pattern-list');
    this.patternForm = document.querySelector('.patterns form');

    // form submit event listener
    this.patternForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = _this.patternForm.querySelector('[name=name]').value;
      var count = parseFloat(_this.patternForm.querySelector('[name=count]').value);
      var pattern = { name: name, count: count };
      _this.pushPattern(pattern);
    });

    // load default patterns into DOM
    for (var key in this.patterns) {
      this.addListItem(this.patterns[key]);
    }
  }

  _createClass(Patterns, [{
    key: 'randomPattern',
    value: function randomPattern() {
      var i = Math.floor(Math.random() * Object.keys(this.patterns).length);
      var keys = Object.keys(this.patterns);
      var name = keys[i];
      return this.patterns[name];
    }

    // add pattern to hash

  }, {
    key: 'pushPattern',
    value: function pushPattern(pattern) {
      this.patterns[pattern.name] = pattern;
      this.addListItem(pattern);
    }

    // add pattern to DOM

  }, {
    key: 'addListItem',
    value: function addListItem(pattern) {
      var _this2 = this;

      var ul = this.patternListView;
      var li = this.listItemTmpl;

      var span = li.content.querySelector('span');
      span.textContent = pattern.name;

      ul.prepend(li.content.cloneNode(true));

      // delete button event listener
      var item = this.patternListView.querySelectorAll('li')[0];
      var btn = item.querySelector('button');
      btn.addEventListener('click', function (e) {
        var name = e.target.parentElement.querySelector('span').innerHTML;
        delete _this2.patterns[name];
        e.target.parentElement.parentElement.remove();
      });
    }
  }]);

  return Patterns;
}();

exports.default = Patterns;

},{"./patterns.json":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Speech = function () {
  function Speech(options) {
    _classCallCheck(this, Speech);

    this.voices = [];
    this.registerDOMNodes();
    this.attachEventListeners();
    this.setupMessage();
  }

  _createClass(Speech, [{
    key: 'setupMessage',
    value: function setupMessage() {
      this.message = new SpeechSynthesisUtterance();
      this.message.rate = 1.4;
    }
  }, {
    key: 'registerDOMNodes',
    value: function registerDOMNodes(options) {
      this.voicesDropdown = document.querySelector('[name="voice"]');
      this.toggleButton = document.querySelector('.speaker button.toggle');
    }
  }, {
    key: 'attachEventListeners',
    value: function attachEventListeners(options) {
      var _this = this;

      speechSynthesis.addEventListener('voiceschanged', function () {
        return _this.populateVoices();
      });

      // this.toggleButton.addEventListener('click', () => {
      //   if (!speechSynthesis.speaking) {
      //     const messageText = document.querySelector('input#phrase').value;
      //     this.speakMsg(messageText);        
      //   } else {
      //     // 'native method': speechSynthesis.cancel must be bound to 'window'.
      //     speechSynthesis.cancel();        
      //   }
      // });
    }
  }, {
    key: 'populateVoices',
    value: function populateVoices() {
      this.voices = speechSynthesis.getVoices().filter(function (voice) {
        return voice.lang.includes('en');
      });
      this.voicesDropdown.innerHTML = this.voices.map(function (voice) {
        return '<option value="' + voice.name + '">' + voice.name + ' (' + voice.lang + ')</option>';
      }).join('');
    }
  }, {
    key: 'speakMsg',
    value: function speakMsg(text) {
      speechSynthesis.cancel();
      this.message.voice = this.voices[this.voicesDropdown.selectedIndex];
      this.message.text = text;
      speechSynthesis.speak(this.message);
    }
  }]);

  return Speech;
}();

exports.default = Speech;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9pbmRleC5qcyIsImpzL21ldHJvbm9tZS5qcyIsImpzL3BhdHRlcm5zLmpzb24iLCJqcy9wYXR0ZXJucy5qcyIsImpzL3NwZWVjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7OztBQUNBLElBQU0sUUFBUSx5QkFBZDs7Ozs7Ozs7O3FqQkNEQTs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFTSxTO0FBQ0oscUJBQWEsT0FBYixFQUFzQjtBQUFBOztBQUNwQixTQUFLLGdCQUFMO0FBQ0EsU0FBSyxvQkFBTDtBQUNBLFNBQUssTUFBTCxHQUFjLHNCQUFkO0FBQ0EsU0FBSyxRQUFMLEdBQWdCLHdCQUFoQjtBQUNBLFNBQUssT0FBTCxHQUFlLEtBQWY7QUFDRDs7Ozt1Q0FFbUI7QUFDbEIsV0FBSyxHQUFMLEdBQVcsU0FBUyxhQUFULENBQXVCLFdBQXZCLENBQVg7QUFDQSxXQUFLLFlBQUwsR0FBb0IsU0FBUyxhQUFULENBQXVCLDBCQUF2QixDQUFwQjtBQUNEOzs7MkNBRXVCO0FBQUE7O0FBQ3RCLFdBQUssWUFBTCxDQUFrQixnQkFBbEIsQ0FBbUMsT0FBbkMsRUFBNEMsWUFBTTtBQUNoRCxZQUFJLE1BQUssT0FBTCxLQUFpQixLQUFyQixFQUE0QjtBQUMxQixnQkFBSyxLQUFMLENBQVcsTUFBSyxHQUFMLENBQVMsS0FBcEI7QUFDRCxTQUZELE1BRU87QUFDTCxnQkFBSyxJQUFMO0FBQ0Q7QUFDRCxjQUFLLE9BQUwsR0FBZSxDQUFDLE1BQUssT0FBckI7QUFDRCxPQVBEO0FBUUQ7OzswQkFFTSxJLEVBQU07QUFDWCxVQUFJLE9BQU8sSUFBUCxDQUFZLEtBQUssUUFBTCxDQUFjLFFBQTFCLEVBQW9DLE1BQXBDLEtBQStDLENBQW5ELEVBQXNEO0FBQ3BELGNBQU0scUJBQU47QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLLFdBQUwsR0FBbUIsSUFBSSxJQUFKLEdBQVcsT0FBWCxFQUFuQjtBQUNBLGFBQUssUUFBTCxHQUFnQixRQUFRLElBQXhCO0FBQ0EsYUFBSyxPQUFMLEdBQWUsRUFBRSxNQUFNLENBQVIsRUFBVyxPQUFPLENBQWxCLEVBQWYsQ0FISyxDQUdpQztBQUN0QyxhQUFLLElBQUwsR0FBWSxDQUFaO0FBQ0EsYUFBSyxPQUFMLEdBQWUsS0FBZjtBQUNBLGFBQUssT0FBTCxHQUFlLEtBQUssZUFBTCxFQUFmO0FBQ0Q7QUFDRjs7O3NDQUVrQjtBQUFBOztBQUNqQixVQUFJLEtBQUssSUFBTCxLQUFjLEtBQUssT0FBTCxDQUFhLEtBQS9CLEVBQXNDO0FBQ3BDLGFBQUssT0FBTCxHQUFlLEtBQUssUUFBTCxDQUFjLGFBQWQsRUFBZjtBQUNBLGFBQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsS0FBSyxPQUFMLENBQWEsSUFBbEM7QUFDQSxhQUFLLElBQUwsR0FBWSxDQUFaO0FBQ0QsT0FKRCxNQUlPO0FBQ0wsYUFBSyxNQUFMLENBQVksUUFBWixDQUFxQixLQUFLLElBQTFCO0FBQ0EsYUFBSyxJQUFMLElBQWEsQ0FBYjtBQUNEOztBQUVELFdBQUssT0FBTCxHQUFlLEtBQUssT0FBTCxLQUFpQixLQUFqQixHQUF5QixDQUF6QixHQUE2QixLQUFLLE9BQUwsR0FBZSxLQUFLLFFBQWhFLENBVmlCLENBVXlEO0FBQzFFLFVBQUksUUFBUSxJQUFJLElBQUosR0FBVyxPQUFYLEtBQXVCLEtBQUssV0FBNUIsR0FBMEMsS0FBSyxPQUEzRDtBQUNBLFVBQUksV0FBVyxLQUFLLFFBQUwsR0FBZ0IsS0FBL0I7QUFDQSxXQUFLLE9BQUwsR0FBZSxPQUFPLFVBQVAsQ0FBa0I7QUFBQSxlQUFNLE9BQUssZUFBTCxFQUFOO0FBQUEsT0FBbEIsRUFBZ0QsUUFBaEQsQ0FBZjtBQUNEOzs7MkJBRU87QUFDTixhQUFPLFlBQVAsQ0FBb0IsS0FBSyxPQUF6QjtBQUNBLFdBQUssT0FBTCxHQUFlLEtBQWY7QUFDRDs7Ozs7O2tCQUdZLFM7OztBQ2hFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdEJBOzs7Ozs7OztJQUVNLFE7QUFDSixzQkFBZTtBQUFBOztBQUFBOztBQUNiLFNBQUssUUFBTDtBQUNBLFNBQUssWUFBTCxHQUF1QixTQUNFLGNBREYsQ0FDaUIsbUJBRGpCLEVBQ3NDLE1BRHRDLENBQzZDLGFBRDdDLENBQzJELFVBRDNELENBQXZCO0FBRUEsU0FBSyxlQUFMLEdBQXVCLFNBQVMsY0FBVCxDQUF3QixjQUF4QixDQUF2QjtBQUNBLFNBQUssV0FBTCxHQUF1QixTQUFTLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQXZCOztBQUVBO0FBQ0EsU0FBSyxXQUFMLENBQWlCLGdCQUFqQixDQUFrQyxRQUFsQyxFQUE0QyxVQUFDLENBQUQsRUFBTztBQUNqRCxRQUFFLGNBQUY7QUFDQSxVQUFJLE9BQU8sTUFBSyxXQUFMLENBQWlCLGFBQWpCLENBQStCLGFBQS9CLEVBQThDLEtBQXpEO0FBQ0EsVUFBSSxRQUFRLFdBQVcsTUFBSyxXQUFMLENBQWlCLGFBQWpCLENBQStCLGNBQS9CLEVBQStDLEtBQTFELENBQVo7QUFDQSxVQUFJLFVBQVUsRUFBQyxVQUFELEVBQU8sWUFBUCxFQUFkO0FBQ0EsWUFBSyxXQUFMLENBQWlCLE9BQWpCO0FBQ0QsS0FORDs7QUFRQTtBQUNBLFNBQUssSUFBSSxHQUFULElBQWdCLEtBQUssUUFBckIsRUFBK0I7QUFDN0IsV0FBSyxXQUFMLENBQWlCLEtBQUssUUFBTCxDQUFjLEdBQWQsQ0FBakI7QUFDRDtBQUNGOzs7O29DQUVnQjtBQUNmLFVBQU0sSUFBSSxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsT0FBTyxJQUFQLENBQVksS0FBSyxRQUFqQixFQUEyQixNQUF0RCxDQUFWO0FBQ0EsVUFBSSxPQUFPLE9BQU8sSUFBUCxDQUFZLEtBQUssUUFBakIsQ0FBWDtBQUNBLFVBQUksT0FBTyxLQUFLLENBQUwsQ0FBWDtBQUNBLGFBQU8sS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Z0NBQ2EsTyxFQUFTO0FBQ3BCLFdBQUssUUFBTCxDQUFjLFFBQVEsSUFBdEIsSUFBK0IsT0FBL0I7QUFDQSxXQUFLLFdBQUwsQ0FBaUIsT0FBakI7QUFDRDs7QUFFRDs7OztnQ0FDYSxPLEVBQVM7QUFBQTs7QUFDcEIsVUFBSSxLQUFLLEtBQUssZUFBZDtBQUNBLFVBQUksS0FBSyxLQUFLLFlBQWQ7O0FBRUEsVUFBSSxPQUFPLEdBQUcsT0FBSCxDQUFXLGFBQVgsQ0FBeUIsTUFBekIsQ0FBWDtBQUNBLFdBQUssV0FBTCxHQUFtQixRQUFRLElBQTNCOztBQUVBLFNBQUcsT0FBSCxDQUFXLEdBQUcsT0FBSCxDQUFXLFNBQVgsQ0FBcUIsSUFBckIsQ0FBWDs7QUFFQTtBQUNBLFVBQUksT0FBTyxLQUFLLGVBQUwsQ0FBcUIsZ0JBQXJCLENBQXNDLElBQXRDLEVBQTRDLENBQTVDLENBQVg7QUFDQSxVQUFJLE1BQU0sS0FBSyxhQUFMLENBQW1CLFFBQW5CLENBQVY7QUFDQSxVQUFJLGdCQUFKLENBQXFCLE9BQXJCLEVBQThCLFVBQUMsQ0FBRCxFQUFPO0FBQ25DLFlBQUksT0FBTyxFQUFFLE1BQUYsQ0FBUyxhQUFULENBQXVCLGFBQXZCLENBQXFDLE1BQXJDLEVBQTZDLFNBQXhEO0FBQ0EsZUFBTyxPQUFLLFFBQUwsQ0FBYyxJQUFkLENBQVA7QUFDQSxVQUFFLE1BQUYsQ0FBUyxhQUFULENBQXVCLGFBQXZCLENBQXFDLE1BQXJDO0FBQ0QsT0FKRDtBQUtEOzs7Ozs7a0JBR1ksUTs7Ozs7Ozs7Ozs7OztJQzNEVCxNO0FBQ0osa0JBQWEsT0FBYixFQUFzQjtBQUFBOztBQUNwQixTQUFLLE1BQUwsR0FBYyxFQUFkO0FBQ0EsU0FBSyxnQkFBTDtBQUNBLFNBQUssb0JBQUw7QUFDQSxTQUFLLFlBQUw7QUFDRDs7OzttQ0FFZTtBQUNkLFdBQUssT0FBTCxHQUFlLElBQUksd0JBQUosRUFBZjtBQUNBLFdBQUssT0FBTCxDQUFhLElBQWIsR0FBb0IsR0FBcEI7QUFDRDs7O3FDQUVpQixPLEVBQVM7QUFDekIsV0FBSyxjQUFMLEdBQXNCLFNBQVMsYUFBVCxDQUF1QixnQkFBdkIsQ0FBdEI7QUFDQSxXQUFLLFlBQUwsR0FBb0IsU0FBUyxhQUFULENBQXVCLHdCQUF2QixDQUFwQjtBQUNEOzs7eUNBRXFCLE8sRUFBUztBQUFBOztBQUM3QixzQkFBZ0IsZ0JBQWhCLENBQWlDLGVBQWpDLEVBQWtEO0FBQUEsZUFBTSxNQUFLLGNBQUwsRUFBTjtBQUFBLE9BQWxEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNEOzs7cUNBRWlCO0FBQ2hCLFdBQUssTUFBTCxHQUFjLGdCQUFnQixTQUFoQixHQUE0QixNQUE1QixDQUFtQztBQUFBLGVBQVMsTUFBTSxJQUFOLENBQVcsUUFBWCxDQUFvQixJQUFwQixDQUFUO0FBQUEsT0FBbkMsQ0FBZDtBQUNBLFdBQUssY0FBTCxDQUFvQixTQUFwQixHQUFnQyxLQUFLLE1BQUwsQ0FDN0IsR0FENkIsQ0FDekI7QUFBQSxtQ0FBMkIsTUFBTSxJQUFqQyxVQUEwQyxNQUFNLElBQWhELFVBQXlELE1BQU0sSUFBL0Q7QUFBQSxPQUR5QixFQUU3QixJQUY2QixDQUV4QixFQUZ3QixDQUFoQztBQUdEOzs7NkJBRVMsSSxFQUFNO0FBQ2Qsc0JBQWdCLE1BQWhCO0FBQ0EsV0FBSyxPQUFMLENBQWEsS0FBYixHQUFxQixLQUFLLE1BQUwsQ0FBWSxLQUFLLGNBQUwsQ0FBb0IsYUFBaEMsQ0FBckI7QUFDQSxXQUFLLE9BQUwsQ0FBYSxJQUFiLEdBQW9CLElBQXBCO0FBQ0Esc0JBQWdCLEtBQWhCLENBQXNCLEtBQUssT0FBM0I7QUFDRDs7Ozs7O2tCQUdZLE0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IE1ldHJvbm9tZSBmcm9tICcuL21ldHJvbm9tZSc7XG5jb25zdCBtZXRybyA9IG5ldyBNZXRyb25vbWUoKTtcbiIsIi8vIFRJTUlORyBJTlRFUlZBTCBCQVNFRCBPTjogc2l0ZXBvaW50LmNvbS9jcmVhdGluZy1hY2N1cmF0ZS10aW1lcnMtaW4tamF2YXNjcmlwdC9cbmltcG9ydCBTcGVlY2ggZnJvbSAnLi9zcGVlY2gnO1xuaW1wb3J0IFBhdHRlcm5zIGZyb20gJy4vcGF0dGVybnMnO1xuXG5jbGFzcyBNZXRyb25vbWUge1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucykge1xuICAgIHRoaXMucmVnaXN0ZXJET01Ob2RlcygpO1xuICAgIHRoaXMuYXR0YWNoRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLnNwZWVjaCA9IG5ldyBTcGVlY2goKTtcbiAgICB0aGlzLnBhdHRlcm5zID0gbmV3IFBhdHRlcm5zKCk7XG4gICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gIH1cblxuICByZWdpc3RlckRPTU5vZGVzICgpIHtcbiAgICB0aGlzLmJwbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0I2JwbScpO1xuICAgIHRoaXMudG9nZ2xlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1ldHJvbm9tZSBidXR0b24udG9nZ2xlJyk7XG4gIH1cblxuICBhdHRhY2hFdmVudExpc3RlbmVycyAoKSB7XG4gICAgdGhpcy50b2dnbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5ydW5uaW5nID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLnN0YXJ0KHRoaXMuYnBtLnZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5ydW5uaW5nID0gIXRoaXMucnVubmluZztcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXJ0IChmcmVxKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMucGF0dGVybnMucGF0dGVybnMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgYWxlcnQoJ3BsZWFzZSBhZGQgcGF0dGVybnMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbml0aWFsVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgdGhpcy5pbnRlcnZhbCA9IDYwMDAwIC8gZnJlcTtcbiAgICAgIHRoaXMucGF0dGVybiA9IHsgbmFtZTogOCwgY291bnQ6IDggfTsgLy8gY291bnQgaW4gOCBiZWF0cyB0byBzdGFydC5cbiAgICAgIHRoaXMuYmVhdCA9IDE7XG4gICAgICB0aGlzLmVsYXBzZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMudGltZW91dCA9IHRoaXMucHJvY2Vzc0ludGVydmFsKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvY2Vzc0ludGVydmFsICgpIHtcbiAgICBpZiAodGhpcy5iZWF0ID09PSB0aGlzLnBhdHRlcm4uY291bnQpIHtcbiAgICAgIHRoaXMucGF0dGVybiA9IHRoaXMucGF0dGVybnMucmFuZG9tUGF0dGVybigpO1xuICAgICAgdGhpcy5zcGVlY2guc3BlYWtNc2codGhpcy5wYXR0ZXJuLm5hbWUpO1xuICAgICAgdGhpcy5iZWF0ID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zcGVlY2guc3BlYWtNc2codGhpcy5iZWF0KTtcbiAgICAgIHRoaXMuYmVhdCArPSAxO1xuICAgIH1cblxuICAgIHRoaXMuZWxhcHNlZCA9IHRoaXMuZWxhcHNlZCA9PT0gZmFsc2UgPyAwIDogdGhpcy5lbGFwc2VkICsgdGhpcy5pbnRlcnZhbDsgLy8gaGFuZGxlcyBmZW5jZXBvc3QgY2FzZVxuICAgIGxldCBlcnJvciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5pbml0aWFsVGltZSAtIHRoaXMuZWxhcHNlZDtcbiAgICBsZXQgYWRqdXN0ZWQgPSB0aGlzLmludGVydmFsIC0gZXJyb3I7XG4gICAgdGhpcy50aW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcm9jZXNzSW50ZXJ2YWwoKSwgYWRqdXN0ZWQpO1xuICB9XG5cbiAgc3RvcCAoKSB7XG4gICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgIHRoaXMuZWxhcHNlZCA9IGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1ldHJvbm9tZTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJwdXNoXCI6IHtcbiAgICBuYW1lOiBcInB1c2hcIixcbiAgICBjb3VudDogNlxuICB9LCBcbiAgXCJwYXNzXCI6IHtcbiAgICBuYW1lOiBcInBhc3NcIixcbiAgICBjb3VudDogNlxuICB9LCBcbiAgXCJ0dXJuXCI6IHtcbiAgICBuYW1lOiBcInR1cm5cIixcbiAgICBjb3VudDogNlxuICB9LFxuICBcIndoaXBcIjoge1xuICAgIG5hbWU6IFwid2hpcFwiLFxuICAgIGNvdW50OiA4XG4gIH0sXG4gIFwidGVsZW1hcmtcIjoge1xuICAgIG5hbWU6IFwidGVsZW1hcmtcIixcbiAgICBjb3VudDogOFxuICB9ICBcbn1cbiIsImltcG9ydCBEZWZhdWx0UGF0dGVybnMgZnJvbSAnLi9wYXR0ZXJucy5qc29uJztcblxuY2xhc3MgUGF0dGVybnMge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5wYXR0ZXJucyAgICAgICAgPSBEZWZhdWx0UGF0dGVybnM7XG4gICAgdGhpcy5saXN0SXRlbVRtcGwgICAgPSBkb2N1bWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRFbGVtZW50QnlJZCgncGF0dGVybi1saXN0LXZpZXcnKS5pbXBvcnQucXVlcnlTZWxlY3RvcigndGVtcGxhdGUnKTtcbiAgICB0aGlzLnBhdHRlcm5MaXN0VmlldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXR0ZXJuLWxpc3QnKTtcbiAgICB0aGlzLnBhdHRlcm5Gb3JtICAgICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYXR0ZXJucyBmb3JtJyk7XG5cbiAgICAvLyBmb3JtIHN1Ym1pdCBldmVudCBsaXN0ZW5lclxuICAgIHRoaXMucGF0dGVybkZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxldCBuYW1lID0gdGhpcy5wYXR0ZXJuRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1uYW1lXScpLnZhbHVlO1xuICAgICAgbGV0IGNvdW50ID0gcGFyc2VGbG9hdCh0aGlzLnBhdHRlcm5Gb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPWNvdW50XScpLnZhbHVlKTtcbiAgICAgIGxldCBwYXR0ZXJuID0ge25hbWUsIGNvdW50fTtcbiAgICAgIHRoaXMucHVzaFBhdHRlcm4ocGF0dGVybik7XG4gICAgfSk7XG5cbiAgICAvLyBsb2FkIGRlZmF1bHQgcGF0dGVybnMgaW50byBET01cbiAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5wYXR0ZXJucykge1xuICAgICAgdGhpcy5hZGRMaXN0SXRlbSh0aGlzLnBhdHRlcm5zW2tleV0pO1xuICAgIH1cbiAgfVxuXG4gIHJhbmRvbVBhdHRlcm4gKCkge1xuICAgIGNvbnN0IGkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBPYmplY3Qua2V5cyh0aGlzLnBhdHRlcm5zKS5sZW5ndGgpO1xuICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5wYXR0ZXJucyk7XG4gICAgbGV0IG5hbWUgPSBrZXlzW2ldO1xuICAgIHJldHVybiB0aGlzLnBhdHRlcm5zW25hbWVdO1xuICB9XG5cbiAgLy8gYWRkIHBhdHRlcm4gdG8gaGFzaFxuICBwdXNoUGF0dGVybiAocGF0dGVybikge1xuICAgIHRoaXMucGF0dGVybnNbcGF0dGVybi5uYW1lXSA9IChwYXR0ZXJuKTtcbiAgICB0aGlzLmFkZExpc3RJdGVtKHBhdHRlcm4pO1xuICB9XG5cbiAgLy8gYWRkIHBhdHRlcm4gdG8gRE9NXG4gIGFkZExpc3RJdGVtIChwYXR0ZXJuKSB7XG4gICAgbGV0IHVsID0gdGhpcy5wYXR0ZXJuTGlzdFZpZXc7XG4gICAgbGV0IGxpID0gdGhpcy5saXN0SXRlbVRtcGw7XG4gICAgXG4gICAgbGV0IHNwYW4gPSBsaS5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKTtcbiAgICBzcGFuLnRleHRDb250ZW50ID0gcGF0dGVybi5uYW1lO1xuXG4gICAgdWwucHJlcGVuZChsaS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICAvLyBkZWxldGUgYnV0dG9uIGV2ZW50IGxpc3RlbmVyXG4gICAgbGV0IGl0ZW0gPSB0aGlzLnBhdHRlcm5MaXN0Vmlldy5xdWVyeVNlbGVjdG9yQWxsKCdsaScpWzBdO1xuICAgIGxldCBidG4gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBsZXQgbmFtZSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3Rvcignc3BhbicpLmlubmVySFRNTDtcbiAgICAgIGRlbGV0ZSB0aGlzLnBhdHRlcm5zW25hbWVdO1xuICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgIH0pO1xuICB9ICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGF0dGVybnNcbiIsImNsYXNzIFNwZWVjaCB7XG4gIGNvbnN0cnVjdG9yIChvcHRpb25zKSB7XG4gICAgdGhpcy52b2ljZXMgPSBbXTtcbiAgICB0aGlzLnJlZ2lzdGVyRE9NTm9kZXMoKTtcbiAgICB0aGlzLmF0dGFjaEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5zZXR1cE1lc3NhZ2UoKTtcbiAgfVxuXG4gIHNldHVwTWVzc2FnZSAoKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gbmV3IFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSgpO1xuICAgIHRoaXMubWVzc2FnZS5yYXRlID0gMS40O1xuICB9ICBcblxuICByZWdpc3RlckRPTU5vZGVzIChvcHRpb25zKSB7XG4gICAgdGhpcy52b2ljZXNEcm9wZG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwidm9pY2VcIl0nKTtcbiAgICB0aGlzLnRvZ2dsZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGVha2VyIGJ1dHRvbi50b2dnbGUnKTtcbiAgfVxuXG4gIGF0dGFjaEV2ZW50TGlzdGVuZXJzIChvcHRpb25zKSB7XG4gICAgc3BlZWNoU3ludGhlc2lzLmFkZEV2ZW50TGlzdGVuZXIoJ3ZvaWNlc2NoYW5nZWQnLCAoKSA9PiB0aGlzLnBvcHVsYXRlVm9pY2VzKCkpO1xuXG4gICAgLy8gdGhpcy50b2dnbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgLy8gICBpZiAoIXNwZWVjaFN5bnRoZXNpcy5zcGVha2luZykge1xuICAgIC8vICAgICBjb25zdCBtZXNzYWdlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0I3BocmFzZScpLnZhbHVlO1xuICAgIC8vICAgICB0aGlzLnNwZWFrTXNnKG1lc3NhZ2VUZXh0KTsgICAgICAgIFxuICAgIC8vICAgfSBlbHNlIHtcbiAgICAvLyAgICAgLy8gJ25hdGl2ZSBtZXRob2QnOiBzcGVlY2hTeW50aGVzaXMuY2FuY2VsIG11c3QgYmUgYm91bmQgdG8gJ3dpbmRvdycuXG4gICAgLy8gICAgIHNwZWVjaFN5bnRoZXNpcy5jYW5jZWwoKTsgICAgICAgIFxuICAgIC8vICAgfVxuICAgIC8vIH0pO1xuICB9XG5cbiAgcG9wdWxhdGVWb2ljZXMgKCkge1xuICAgIHRoaXMudm9pY2VzID0gc3BlZWNoU3ludGhlc2lzLmdldFZvaWNlcygpLmZpbHRlcih2b2ljZSA9PiB2b2ljZS5sYW5nLmluY2x1ZGVzKCdlbicpKTtcbiAgICB0aGlzLnZvaWNlc0Ryb3Bkb3duLmlubmVySFRNTCA9IHRoaXMudm9pY2VzXG4gICAgICAubWFwKHZvaWNlID0+IGA8b3B0aW9uIHZhbHVlPVwiJHt2b2ljZS5uYW1lfVwiPiR7dm9pY2UubmFtZX0gKCR7dm9pY2UubGFuZ30pPC9vcHRpb24+YClcbiAgICAgIC5qb2luKCcnKTtcbiAgfVxuXG4gIHNwZWFrTXNnICh0ZXh0KSB7XG4gICAgc3BlZWNoU3ludGhlc2lzLmNhbmNlbCgpO1xuICAgIHRoaXMubWVzc2FnZS52b2ljZSA9IHRoaXMudm9pY2VzW3RoaXMudm9pY2VzRHJvcGRvd24uc2VsZWN0ZWRJbmRleF07XG4gICAgdGhpcy5tZXNzYWdlLnRleHQgPSB0ZXh0O1xuICAgIHNwZWVjaFN5bnRoZXNpcy5zcGVhayh0aGlzLm1lc3NhZ2UpO1xuICB9ICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgU3BlZWNoXG4iXX0=
