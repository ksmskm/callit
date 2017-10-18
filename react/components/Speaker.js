import React from 'react';

class Speaker extends React.Component {
  render () {
    return (
      <div className="speaker">
        <h3>Voice</h3>
        <form action="" name="speaker">
          <select name="voice" id="voice">
            <option defaultValue="">Select a Voice</option>
          </select>
        </form>
      </div>
    );
  }
}

module.exports = Speaker;
