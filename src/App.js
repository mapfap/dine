import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import OrderTaking from './OrderTaking';
import BackOffice from './BackOffice';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route exact path='/' component={OrderTaking} />
            <Route exact path='/backoffice' component={BackOffice} />
          </Switch>
      </Router>
    );
  }
}

export default App;