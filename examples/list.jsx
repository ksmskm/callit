var React = require('React/addons'),
  ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
  ListItemComponent = require('./list-item.jsx');

module.exports = React.createClass({
  // we are passing a callback from our props that might not exist, so we
  // create a default empty function just in case
  getDefaultProps: function() {
    return {
      onListItemSelected: function() {

      }
    };
  },
  render: function() {
    var listItems = [];

    // We use the ES5 map function on our items array to generate List Item Components
    listItems = this.props.items.map((function(item) {
      // Each List Item Component needs a key attribute for uniqueness:
      // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
      // In addition, we pass in our item data and a handleOnClick function that executes a callback that passes
      // the item value
      return <ListItemComponent key={item.id} item={item} handleOnClick={this.props.onListItemSelected.bind(null, item)}/>;
    }).bind(this));

    // We can simply add the array of list item components right inside our <ul>
    // We wrap the listItems in ReactCSSTransitionGroup so that every item gets a transition className on enter and leave
    // for css3 animation purposes: http://facebook.github.io/react/docs/animation.html
    return (
      <ul className="list">
      <ReactCSSTransitionGroup transitionName="list-item">
      {listItems}
      </ReactCSSTransitionGroup>
      </ul>
    );
  }
});