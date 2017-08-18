import DefaultPatterns from './patterns.json';

class Patterns {
  constructor () {
    this.patterns        = DefaultPatterns;
    this.listItemTmpl    = document
                            .getElementById('pattern-list-view').import.querySelector('template');
    this.patternListView = document.getElementById('pattern-list');
    this.patternForm     = document.querySelector('.patterns form');

    // form submit event listener
    this.patternForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let name = this.patternForm.querySelector('[name=name]').value;
      let count = parseFloat(this.patternForm.querySelector('[name=count]').value);
      let pattern = {name, count};
      this.pushPattern(pattern);
    });

    // load default patterns into DOM
    for (let key in this.patterns) {
      this.addListItem(this.patterns[key]);
    }
  }

  randomPattern () {
    const i = Math.floor(Math.random() * Object.keys(this.patterns).length);
    let keys = Object.keys(this.patterns);
    let name = keys[i];
    return this.patterns[name];
  }

  // add pattern to hash
  pushPattern (pattern) {
    this.patterns[pattern.name] = (pattern);
    this.addListItem(pattern);
  }

  // add pattern to DOM
  addListItem (pattern) {
    let ul = this.patternListView;
    let li = this.listItemTmpl;
    
    let span = li.content.querySelector('span');
    span.textContent = pattern.name;

    ul.prepend(li.content.cloneNode(true));

    // delete button event listener
    let item = this.patternListView.querySelectorAll('li')[0];
    let btn = item.querySelector('button');
    btn.addEventListener('click', (e) => {
      let name = e.target.parentElement.querySelector('span').innerHTML;
      delete this.patterns[name];
      e.target.parentElement.parentElement.remove();
    });
  }  
}

export default Patterns
