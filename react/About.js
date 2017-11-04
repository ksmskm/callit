import React from 'react';
import '../dist/css/about.css';

function About (props) {
  return (
    <div className="main">
      <div className="about">
        <h3>Call It</h3>
        <p>In context of teaching dance, Pattern Calling is the act of telling students what move to do next.</p>
        <p>It's often done intentionally suddenly before the next pattern is expected to be executed.</p>  
        <p>The uncertainty being and intended challenge.</p>
        <h3>How To</h3>
        <p>A simple tool to help you remember the patterns you know, when you're in the moment.</p>
        <ol>
          <li>
            <p>Select a voice synth.</p>
          </li>
          <li>
            <p>Enter Patterns & their lengths.</p>
          </li>
          <li>
            <p>Set the metronome speed & begin!</p>
          </li>
        </ol>
      </div>
    </div>  
  );
}

export default About;
