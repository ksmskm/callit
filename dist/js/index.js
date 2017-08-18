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
    this.listItemTmpl = document.getElementById('pattern-list-view');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9pbmRleC5qcyIsImpzL21ldHJvbm9tZS5qcyIsImpzL3BhdHRlcm5zLmpzb24iLCJqcy9wYXR0ZXJucy5qcyIsImpzL3NwZWVjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7OztBQUNBLElBQU0sUUFBUSx5QkFBZDs7Ozs7Ozs7O3FqQkNEQTs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFTSxTO0FBQ0oscUJBQWEsT0FBYixFQUFzQjtBQUFBOztBQUNwQixTQUFLLGdCQUFMO0FBQ0EsU0FBSyxvQkFBTDtBQUNBLFNBQUssTUFBTCxHQUFjLHNCQUFkO0FBQ0EsU0FBSyxRQUFMLEdBQWdCLHdCQUFoQjtBQUNBLFNBQUssT0FBTCxHQUFlLEtBQWY7QUFDRDs7Ozt1Q0FFbUI7QUFDbEIsV0FBSyxHQUFMLEdBQVcsU0FBUyxhQUFULENBQXVCLFdBQXZCLENBQVg7QUFDQSxXQUFLLFlBQUwsR0FBb0IsU0FBUyxhQUFULENBQXVCLDBCQUF2QixDQUFwQjtBQUNEOzs7MkNBRXVCO0FBQUE7O0FBQ3RCLFdBQUssWUFBTCxDQUFrQixnQkFBbEIsQ0FBbUMsT0FBbkMsRUFBNEMsWUFBTTtBQUNoRCxZQUFJLE1BQUssT0FBTCxLQUFpQixLQUFyQixFQUE0QjtBQUMxQixnQkFBSyxLQUFMLENBQVcsTUFBSyxHQUFMLENBQVMsS0FBcEI7QUFDRCxTQUZELE1BRU87QUFDTCxnQkFBSyxJQUFMO0FBQ0Q7QUFDRCxjQUFLLE9BQUwsR0FBZSxDQUFDLE1BQUssT0FBckI7QUFDRCxPQVBEO0FBUUQ7OzswQkFFTSxJLEVBQU07QUFDWCxVQUFJLE9BQU8sSUFBUCxDQUFZLEtBQUssUUFBTCxDQUFjLFFBQTFCLEVBQW9DLE1BQXBDLEtBQStDLENBQW5ELEVBQXNEO0FBQ3BELGNBQU0scUJBQU47QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLLFdBQUwsR0FBbUIsSUFBSSxJQUFK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RDs7O3FDQUVpQixPLEVBQVM7QUFDekIsV0FBSyxjQUFMLEdBQXNCLFNBQVMsYUFBVCxDQUF1QixnQkFBdkIsQ0FBdEI7QUFDQSxXQUFLLFlBQUwsR0FBb0IsU0FBUyxhQUFULENBQXVCLHdCQUF2QixDQUFwQjtBQUNEOzs7eUNBRXFCLE8sRUFBUztBQUFBOztBQUM3QixzQkFBZ0IsZ0JBQWhCLENBQWlDLGVBQWpDLEVBQWtEO0FBQUEsZUFBTSxNQUFLLGNBQUwsRUFBTjtBQUFBLE9BQWxEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNEOzs7cUNBRWlCO0FBQ2hCLFdBQUssTUFBTCxHQUFjLGdCQUFnQixTQUFoQixHQUE0QixNQUE1QixDQUFtQztBQUFBLGVBQVMsTUFBTSxJQUFOLENBQVcsUUFBWCxDQUFvQixJQUFwQixDQUFUO0FBQUEsT0FBbkMsQ0FBZDtBQUNBLFdBQUssY0FBTCxDQUFvQixTQUFwQixHQUFnQyxLQUFLLE1BQUwsQ0FDN0IsR0FENkIsQ0FDekI7QUFBQSxtQ0FBMkIsTUFBTSxJQUFqQyxVQUEwQyxNQUFNLElBQWhELFVBQXlELE1BQU0sSUFBL0Q7QUFBQSxPQUR5QixFQUU3QixJQUY2QixDQUV4QixFQUZ3QixDQUFoQztBQUdEOzs7NkJBRVMsSSxFQUFNO0FBQ2Qsc0JBQWdCLE1BQWhCO0FBQ0EsV0FBSyxPQUFMLENBQWEsS0FBYixHQUFxQixLQUFLLE1BQUwsQ0FBWSxLQUFLLGNBQUwsQ0FBb0IsYUFBaEMsQ0FBckI7QUFDQSxXQUFLLE9BQUwsQ0FBYSxJQUFiLEdBQW9CLElBQXBCO0FBQ0Esc0JBQWdCLEtBQWhCLENBQXNCLEtBQUssT0FBM0I7QUFDRDs7Ozs7O2tCQUdZLE0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IE1ldHJvbm9tZSBmcm9tICcuL21ldHJvbm9tZSc7XG5jb25zdCBtZXRybyA9IG5ldyBNZXRyb25vbWUoKTtcbiIsIi8vIFRJTUlORyBJTlRFUlZBTCBCQVNFRCBPTjogc2l0ZXBvaW50LmNvbS9jcmVhdGluZy1hY2N1cmF0ZS10aW1lcnMtaW4tamF2YXNjcmlwdC9cbmltcG9ydCBTcGVlY2ggZnJvbSAnLi9zcGVlY2gnO1xuaW1wb3J0IFBhdHRlcm5zIGZyb20gJy4vcGF0dGVybnMnO1xuXG5jbGFzcyBNZXRyb25vbWUge1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucykge1xuICAgIHRoaXMucmVnaXN0ZXJET01Ob2RlcygpO1xuICAgIHRoaXMuYXR0YWNoRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLnNwZWVjaCA9IG5ldyBTcGVlY2goKTtcbiAgICB0aGlzLnBhdHRlcm5zID0gbmV3IFBhdHRlcm5zKCk7XG4gICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gIH1cblxuICByZWdpc3RlckRPTU5vZGVzICgpIHtcbiAgICB0aGlzLmJwbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0I2JwbScpO1xuICAgIHRoaXMudG9nZ2xlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1ldHJvbm9tZSBidXR0b24udG9nZ2xlJyk7XG4gIH1cblxuICBhdHRhY2hFdmVudExpc3RlbmVycyAoKSB7XG4gICAgdGhpcy50b2dnbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5ydW5uaW5nID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLnN0YXJ0KHRoaXMuYnBtLnZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5ydW5uaW5nID0gIXRoaXMucnVubmluZztcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXJ0IChmcmVxKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMucGF0dGVybnMucGF0dGVybnMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgYWxlcnQoJ3BsZWFzZSBhZGQgcGF0dGVybnMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbml0aWFsVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgdGhpcy5pbnRlcnZhbCA9IDYwMDAwIC8gZnJlcTsgXG4gICAgICB0aGlzLnBhdHRlcm4gPSB7IG5hbWU6IDgsIGNvdW50OiA4IH07IC8vIGNvdW50IGluIDggYmVhdHMgdG8gc3RhcnQuXG4gICAgICB0aGlzLmJlYXQgPSAxO1xuICAgICAgdGhpcy5lbGFwc2VkID0gZmFsc2U7XG4gICAgICB0aGlzLnRpbWVvdXQgPSB0aGlzLnByb2Nlc3NJbnRlcnZhbCgpO1xuICAgIH1cbiAgfVxuXG4gIHByb2Nlc3NJbnRlcnZhbCAoKSB7XG4gICAgaWYgKHRoaXMuYmVhdCA9PT0gdGhpcy5wYXR0ZXJuLmNvdW50KSB7ICBcbiAgICAgIHRoaXMucGF0dGVybiA9IHRoaXMucGF0dGVybnMucmFuZG9tUGF0dGVybigpO1xuICAgICAgdGhpcy5zcGVlY2guc3BlYWtNc2codGhpcy5wYXR0ZXJuLm5hbWUpO1xuICAgICAgdGhpcy5iZWF0ID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zcGVlY2guc3BlYWtNc2codGhpcy5iZWF0KTtcbiAgICAgIHRoaXMuYmVhdCArPSAxOyAgICAgICAgIFxuICAgIH1cblxuICAgIHRoaXMuZWxhcHNlZCA9IHRoaXMuZWxhcHNlZCA9PT0gZmFsc2UgPyAwIDogdGhpcy5lbGFwc2VkICsgdGhpcy5pbnRlcnZhbDsgLy8gaGFuZGxlcyBmZW5jZXBvc3QgY2FzZVxuICAgIGxldCBlcnJvciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5pbml0aWFsVGltZSAtIHRoaXMuZWxhcHNlZDtcbiAgICBsZXQgYWRqdXN0ZWQgPSB0aGlzLmludGVydmFsIC0gZXJyb3I7XG4gICAgdGhpcy50aW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcm9jZXNzSW50ZXJ2YWwoKSwgYWRqdXN0ZWQpOyAgICAgXG4gIH1cblxuICBzdG9wICgpIHtcbiAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgdGhpcy5lbGFwc2VkID0gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWV0cm9ub21lXG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwicHVzaFwiOiB7XG4gICAgbmFtZTogXCJwdXNoXCIsXG4gICAgY291bnQ6IDZcbiAgfSwgXG4gIFwicGFzc1wiOiB7XG4gICAgbmFtZTogXCJwYXNzXCIsXG4gICAgY291bnQ6IDZcbiAgfSwgXG4gIFwidHVyblwiOiB7XG4gICAgbmFtZTogXCJ0dXJuXCIsXG4gICAgY291bnQ6IDZcbiAgfSxcbiAgXCJ3aGlwXCI6IHtcbiAgICBuYW1lOiBcIndoaXBcIixcbiAgICBjb3VudDogOFxuICB9LFxuICBcInRlbGVtYXJrXCI6IHtcbiAgICBuYW1lOiBcInRlbGVtYXJrXCIsXG4gICAgY291bnQ6IDhcbiAgfSAgXG59XG4iLCJpbXBvcnQgRGVmYXVsdFBhdHRlcm5zIGZyb20gJy4vcGF0dGVybnMuanNvbic7XG5cbmNsYXNzIFBhdHRlcm5zIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMucGF0dGVybnMgICAgICAgID0gRGVmYXVsdFBhdHRlcm5zO1xuICAgIHRoaXMubGlzdEl0ZW1UbXBsICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhdHRlcm4tbGlzdC12aWV3Jyk7XG4gICAgdGhpcy5wYXR0ZXJuTGlzdFZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGF0dGVybi1saXN0Jyk7XG4gICAgdGhpcy5wYXR0ZXJuRm9ybSAgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGF0dGVybnMgZm9ybScpO1xuXG4gICAgLy8gZm9ybSBzdWJtaXQgZXZlbnQgbGlzdGVuZXJcbiAgICB0aGlzLnBhdHRlcm5Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgbmFtZSA9IHRoaXMucGF0dGVybkZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9bmFtZV0nKS52YWx1ZTtcbiAgICAgIGxldCBjb3VudCA9IHBhcnNlRmxvYXQodGhpcy5wYXR0ZXJuRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1jb3VudF0nKS52YWx1ZSk7XG4gICAgICBsZXQgcGF0dGVybiA9IHtuYW1lLCBjb3VudH07XG4gICAgICB0aGlzLnB1c2hQYXR0ZXJuKHBhdHRlcm4pO1xuICAgIH0pO1xuXG4gICAgLy8gbG9hZCBkZWZhdWx0IHBhdHRlcm5zIGludG8gRE9NXG4gICAgZm9yIChsZXQga2V5IGluIHRoaXMucGF0dGVybnMpIHtcbiAgICAgIHRoaXMuYWRkTGlzdEl0ZW0odGhpcy5wYXR0ZXJuc1trZXldKTtcbiAgICB9XG4gIH1cblxuICByYW5kb21QYXR0ZXJuICgpIHtcbiAgICBjb25zdCBpID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogT2JqZWN0LmtleXModGhpcy5wYXR0ZXJucykubGVuZ3RoKTtcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMucGF0dGVybnMpO1xuICAgIGxldCBuYW1lID0ga2V5c1tpXTtcbiAgICByZXR1cm4gdGhpcy5wYXR0ZXJuc1tuYW1lXTtcbiAgfVxuXG4gIC8vIGFkZCBwYXR0ZXJuIHRvIGhhc2hcbiAgcHVzaFBhdHRlcm4gKHBhdHRlcm4pIHtcbiAgICB0aGlzLnBhdHRlcm5zW3BhdHRlcm4ubmFtZV0gPSAocGF0dGVybik7XG4gICAgdGhpcy5hZGRMaXN0SXRlbShwYXR0ZXJuKTtcbiAgfVxuXG4gIC8vIGFkZCBwYXR0ZXJuIHRvIERPTVxuICBhZGRMaXN0SXRlbSAocGF0dGVybikge1xuICAgIGxldCB1bCA9IHRoaXMucGF0dGVybkxpc3RWaWV3O1xuICAgIGxldCBsaSA9IHRoaXMubGlzdEl0ZW1UbXBsO1xuICAgIFxuICAgIGxldCBzcGFuID0gbGkuY29udGVudC5xdWVyeVNlbGVjdG9yKCdzcGFuJyk7XG4gICAgc3Bhbi50ZXh0Q29udGVudCA9IHBhdHRlcm4ubmFtZTtcblxuICAgIHVsLnByZXBlbmQobGkuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuXG4gICAgLy8gZGVsZXRlIGJ1dHRvbiBldmVudCBsaXN0ZW5lclxuICAgIGxldCBpdGVtID0gdGhpcy5wYXR0ZXJuTGlzdFZpZXcucXVlcnlTZWxlY3RvckFsbCgnbGknKVswXTtcbiAgICBsZXQgYnRuID0gaXRlbS5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgbGV0IG5hbWUgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKS5pbm5lckhUTUw7XG4gICAgICBkZWxldGUgdGhpcy5wYXR0ZXJuc1tuYW1lXTtcbiAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcbiAgICB9KTtcbiAgfSAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhdHRlcm5zXG4iLCJjbGFzcyBTcGVlY2gge1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucykge1xuICAgIHRoaXMudm9pY2VzID0gW107XG4gICAgdGhpcy5yZWdpc3RlckRPTU5vZGVzKCk7XG4gICAgdGhpcy5hdHRhY2hFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMuc2V0dXBNZXNzYWdlKCk7XG4gIH1cblxuICBzZXR1cE1lc3NhZ2UgKCkge1xuICAgIHRoaXMubWVzc2FnZSA9IG5ldyBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UoKTtcbiAgICB0aGlzLm1lc3NhZ2UucmF0ZSA9IDEuNDtcbiAgfSAgXG5cbiAgcmVnaXN0ZXJET01Ob2RlcyAob3B0aW9ucykge1xuICAgIHRoaXMudm9pY2VzRHJvcGRvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cInZvaWNlXCJdJyk7XG4gICAgdGhpcy50b2dnbGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BlYWtlciBidXR0b24udG9nZ2xlJyk7XG4gIH1cblxuICBhdHRhY2hFdmVudExpc3RlbmVycyAob3B0aW9ucykge1xuICAgIHNwZWVjaFN5bnRoZXNpcy5hZGRFdmVudExpc3RlbmVyKCd2b2ljZXNjaGFuZ2VkJywgKCkgPT4gdGhpcy5wb3B1bGF0ZVZvaWNlcygpKTtcblxuICAgIC8vIHRoaXMudG9nZ2xlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIC8vICAgaWYgKCFzcGVlY2hTeW50aGVzaXMuc3BlYWtpbmcpIHtcbiAgICAvLyAgICAgY29uc3QgbWVzc2FnZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCNwaHJhc2UnKS52YWx1ZTtcbiAgICAvLyAgICAgdGhpcy5zcGVha01zZyhtZXNzYWdlVGV4dCk7ICAgICAgICBcbiAgICAvLyAgIH0gZWxzZSB7XG4gICAgLy8gICAgIC8vICduYXRpdmUgbWV0aG9kJzogc3BlZWNoU3ludGhlc2lzLmNhbmNlbCBtdXN0IGJlIGJvdW5kIHRvICd3aW5kb3cnLlxuICAgIC8vICAgICBzcGVlY2hTeW50aGVzaXMuY2FuY2VsKCk7ICAgICAgICBcbiAgICAvLyAgIH1cbiAgICAvLyB9KTtcbiAgfVxuXG4gIHBvcHVsYXRlVm9pY2VzICgpIHtcbiAgICB0aGlzLnZvaWNlcyA9IHNwZWVjaFN5bnRoZXNpcy5nZXRWb2ljZXMoKS5maWx0ZXIodm9pY2UgPT4gdm9pY2UubGFuZy5pbmNsdWRlcygnZW4nKSk7XG4gICAgdGhpcy52b2ljZXNEcm9wZG93bi5pbm5lckhUTUwgPSB0aGlzLnZvaWNlc1xuICAgICAgLm1hcCh2b2ljZSA9PiBgPG9wdGlvbiB2YWx1ZT1cIiR7dm9pY2UubmFtZX1cIj4ke3ZvaWNlLm5hbWV9ICgke3ZvaWNlLmxhbmd9KTwvb3B0aW9uPmApXG4gICAgICAuam9pbignJyk7XG4gIH1cblxuICBzcGVha01zZyAodGV4dCkge1xuICAgIHNwZWVjaFN5bnRoZXNpcy5jYW5jZWwoKTtcbiAgICB0aGlzLm1lc3NhZ2Uudm9pY2UgPSB0aGlzLnZvaWNlc1t0aGlzLnZvaWNlc0Ryb3Bkb3duLnNlbGVjdGVkSW5kZXhdO1xuICAgIHRoaXMubWVzc2FnZS50ZXh0ID0gdGV4dDtcbiAgICBzcGVlY2hTeW50aGVzaXMuc3BlYWsodGhpcy5tZXNzYWdlKTtcbiAgfSAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNwZWVjaFxuIl19
