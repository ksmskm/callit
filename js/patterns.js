import DefaultPatterns from './patterns.json';

class Patterns {
  constructor () {
    this.patterns = DefaultPatterns;
    this.patternForm = document.querySelector('.patterns form');
    this.patternForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let name = this.patternForm.querySelector('[name=name]').value;
      let count = parseFloat(this.patternForm.querySelector('[name=count]').value);
      this.pushPattern({name, count});
    });
  }

  randomPattern () {
    // TODO handle empty patterns list
    const i = Math.floor(Math.random() * this.patterns.length);
    return this.patterns[i];
  }

  pushPattern (pattern) {
    this.patterns.push(pattern);
  }
}

export default Patterns
