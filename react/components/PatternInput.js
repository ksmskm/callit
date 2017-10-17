import React from 'react';
import PropTypes from 'prop-types';

class PatternInput extends React.Component {
  getDefaultProps () {
    return {
      onInputSubmit: function () {
        console.log('dumby input submit');
      }
    };
  }

  getInputValue () {
    return {
      name: this.refs.nameInput.getDOMNode().value,
      count: this.refs.countInput.getDOMNode().value
    };
  }

  clearInputValue () {
    this.refs.nameInput.getDOMNode().value = '';
  }

  handleSubmit () {
    let val = this.getInputValue();
    this.props.onInputSubmit(val);
  }

  render () {
    return (
      <div className="pattern-form">
        <form action="" name="patterns" method="post">
          <div className="name">
            <label htmlFor="pattern_name">Name:</label>
            <input ref={(input) => { this.nameInput = input; }} type="text" id="pattern_name" name="name" />
          </div>
          <div className="count">
            <label htmlFor="pattern_count">Count:</label>
            <input
              ref={(input) => { this.countInput = input; }}
              type="number"
              id="pattern_count"
              name="count"
              step="2"
              defaultValue="6"
              min="2" max="16" />
          </div>
          <div className="button">
            <button onClick={this.handleSubmit} className="addPattern" type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

PatternInput.propTypes = {
  onInputSubmit: PropTypes.function
};

module.exports = PatternInput;
