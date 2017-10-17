var React = require('React');

module.exports = React.createClass({
  // we are passing a callback from our props that might not exist, so we
  // create a default empty function just in case
  getDefaultProps: function() {
    return {
      handleOnClick: function() {

      }
    };
  },
  render: function() {

    // we assume that a handleOnClick function has been passed into the component via props
    return  (
      <li className="list-item" onClick={this.props.handleOnClick.bind(null, this.props.item)}>
        {this.props.item.text}
      </li>
    );
  }
});