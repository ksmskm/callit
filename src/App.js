import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import Callit from './callit/Callit';
import Footer from './Footer';
import About from './About';
import Videos from './Videos';

import '../dist/css/base.css';

function App (props) {
  return (
    <div>    
      <Header />
      <Switch>
        <Route exact path='/' component={Callit} />
        <Route exact path='/videos' component={Videos} />
        <Route exact path='/about' component={About} />
      </Switch>
      <Footer />      
    </div>
  );
}

export default App;
