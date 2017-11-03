import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Callit from './components/callit/Callit';
import Footer from './components/Footer';
import About from './components/About';
import Videos from './components/Videos';

function App (props) {
  return (
    <div>    
      <Header />
      <Switch>
        <Redirect exact from="/" to="/callit" />
        <Route exact path='/callit' component={Callit} />
        <Route exact path='/videos' component={Videos} />
        <Route exact path='/about' component={About} />
      </Switch>
      <Footer />      
    </div>
  );
}

export default App;
