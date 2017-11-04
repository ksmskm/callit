import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
	<header>
	  <a href="https://www.ksmskm.com">
	    <img src="img/pixel-headshot-cropped.png" alt="logo" />
	  </a>
	  
	  <Link to="/callit">
	  	<h1>Call It</h1>
	  </Link>	  

	  <nav className="header">    
	    <ul>
	      <li><Link to="/callit">Call It</Link></li>
	      <li><Link to="/about">About</Link></li>
	      <li><Link to="/videos">Videos</Link></li>
	      <li><a href="https://www.ksmskm.com">Portfolio</a></li>
	    </ul>
	  </nav>

	</header>
);

export default Header;
