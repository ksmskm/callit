import DefaultPatterns from './patterns.json';

class Patterns {
  constructor () {
    this.patterns        = DefaultPatterns;
    this.listItemTmpl    = document.getElementById('pattern-list-view');
    this.patternListView = document.getElementById('pattern-list');
    this.patternForm     = document.querySelector('.patterns form');

    this.patternForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let name = this.patternForm.querySelector('[name=name]').value;
      let count = parseFloat(this.patternForm.querySelector('[name=count]').value);
      let pattern = {name, count};
      this.pushPattern(pattern);
    });

    for (let pattern of this.patterns) {
      this.addListItem(pattern);
    }
  }

  randomPattern () {
    // TODO handle empty patterns list
    const i = Math.floor(Math.random() * this.patterns.length);
    return this.patterns[i];
  }

  pushPattern (pattern) {
    this.patterns.push(pattern);
    this.addListItem(pattern);
  }

  addListItem (pattern) {
    let ul = this.patternListView;
    let li = this.listItemTmpl;
    let span = li.content.querySelector('span');
    span.textContent = pattern.name;
    ul.prepend(li.content.cloneNode(true));
  }  
}

export default Patterns
