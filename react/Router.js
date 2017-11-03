import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';

function Router (props) {
  return (
  	<BrowserRouter>
  		<div>			
	      <Header />
	  		<div>
			    <Switch>
			      <Route exact path='/' component={App}/>
			    </Switch>  			
	  		</div>
	      <Footer />  	
  		</div>
  	</BrowserRouter>
  );
}

ReactDOM.render(<Router />, document.getElementById('app'));
