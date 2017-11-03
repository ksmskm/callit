import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer>

    <nav>    
      <ul>
        <li><Link to="index.html">Call It</Link></li>
        <li><Link to="about.html">About</Link></li>
        <li><Link to="videos.html">Videos</Link></li>
        <li><Link to="www.ksmskm.com">Portfolio</Link></li>
      </ul>
    </nav>

  </footer>
);

export default Footer;

