import React from 'react';
import PropTypes from 'prop-types';

class Pattern extends React.Component {
  constructor (props) {
    super(props);

    this.delete = this.delete.bind(this);
  }

  delete () {
    this.props.handleRemove(this.props.pattern.id);
  }

  render () {
    return (
      <li>
        <div className="pattern">
          <span>{this.props.pattern.name}</span>
          <button onClick={this.delete} className="delete" type="button">delete</button>
        </div>
      </li>
    );
  }
}

Pattern.propTypes = {
  pattern: PropTypes.object.isRequired,
  handleRemove: PropTypes.func
};

module.exports = Pattern;
