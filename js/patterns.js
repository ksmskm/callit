class Patterns {
  constructor () {
    this.patterns = [{
        name: 'sugar push',
        count: 6
      }, {
        name: 'side pass',
        count: 6
      }, {
        name: 'whip',
        count: 8
      }, {
        name: 'underarm turn',
        count: 6
      }];
      this.setPattern();
  }

  setPattern (name) {
    const i = Math.floor(Math.random() * this.patterns.length);
    this.currentPattern = this.patterns[i];
  }
}

export default Patterns
