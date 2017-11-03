import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
	<header>
	  <Link to="https://www.ksmskm.com/">
	    <img src="dist/pixel-headshot-cropped.png" alt="logo" />
	  </Link>
	  <h1>Call It</h1>
	  
	  <nav className="header">    
	    <ul>
	      <li><Link to="index.html">Call It</Link></li>
	      <li><Link to="about.html">About</Link></li>
	      <li><Link to="videos.html">Videos</Link></li>
	      <li><Link to="https://www.ksmskm.com">Portfolio</Link></li>
	    </ul>
	  </nav>

	</header>
);

export default Header;
