import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer>

    <nav>    
      <ul>
        <li><Link to="/callit">Call It</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/videos">Videos</Link></li>
        <li><a href="http://www.ksmskm.com">Portfolio</a></li>
      </ul>
    </nav>

  </footer>
);

export default Footer;

