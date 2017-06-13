class Patterns {
  constructor () {
    this.patterns = [
      {
        name: 'push',
        count: 6
      }, 
      {
        name: 'pass',
        count: 6
      }, 
      {
        name: 'whip',
        count: 8
      },
      {
        name: 'turn',
        count: 6
      }
    ];
  }

  randomPattern () {
    const i = Math.floor(Math.random() * this.patterns.length);
    return this.patterns[i];
  }

  pushPattern (pattern) {
    this.patterns.push(pattern);
  }
}

export default Patterns
