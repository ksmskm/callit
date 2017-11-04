import React from 'react';
import PropTypes from 'prop-types';

class PatternInput extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      name: '',
      count: 6
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCountChange = this.handleCountChange.bind(this);
  }

  handleNameChange (e) {
    this.setState({ name: e.target.value });
  }

  handleCountChange (e) {
    this.setState({ count: e.target.value });
  }

  handleSubmit (e) {
    e.preventDefault();
    let val = {
      name: this.state.name,
      count: this.state.count
    };
    this.props.handleSubmit(val.name, val.count);
    this.setState({
      name: '',
      count: 6
    });
  }

  render () {
    return (
      <div className="pattern-form">
        <form onSubmit={this.handleSubmit} action="" name="patterns" method="post">
          <div className="name">
            <label htmlFor="pattern_name">Name:</label>
            <input value={this.state.name} onChange={this.handleNameChange}
             type="text" id="pattern_name" name="name" />
          </div>
          <div className="count">
            <label htmlFor="pattern_count">Count:</label>
            <input
              value={this.state.count}
              onChange={this.handleCountChange}
              type="number"
              id="pattern_count"
              name="count"
              step="2"
              min="2" max="16" />
          </div>
          <div className="button">
            <button className="addPattern" type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

PatternInput.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

module.exports = PatternInput;
