var React = require('React');

module.exports = React.createClass({
  // we are passing a callback from our props that might not exist, so we
  // create a default empty function just in case
  getDefaultProps: function() {
    return {
      onInputSubmit: function() {

      }
    };
  },
  handleKeyup: function(e) {
    var val = this.getInputValue();

    // if the user has hit return, and there is a non empty value, execute the parent
    // callback passing the input value
    if(e.which === 13 && val){
      this.props.onInputSubmit(val);
    }
  },
  clearInputValue: function() {
    this.refs.input.getDOMNode().value = '';
  },
  getInputValue: function() {
    return this.refs.input.getDOMNode().value;
  },
  render: function() {
    return <input ref="input" placeholder={this.props.placeholder} onKeyUp={this.handleKeyup}/>;
  }
});