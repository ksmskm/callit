import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Callit from './components/callit/Callit';
import Footer from './components/Footer';

function App (props) {
  return (
    <div>    
      <Header />
      <Switch>
        <Redirect exact from="/" to="/callit" />
        <Route exact path='/callit' component={Callit} />
      </Switch>
      <Footer />      
    </div>
  );
}

export default App;
