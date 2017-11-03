import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
	<header>
	  <a href="https://www.ksmskm.com">
	    <img src="dist/pixel-headshot-cropped.png" alt="logo" />
	  </a>
	  <h1>Call It</h1>
	  
	  <nav className="header">    
	    <ul>
	      <li><Link to="/">Call It</Link></li>
	      <li><Link to="/about">About</Link></li>
	      <li><Link to="/videos">Videos</Link></li>
	      <li><a href="https://www.ksmskm.com">Portfolio</a></li>
	    </ul>
	  </nav>

	</header>
);

export default Header;
