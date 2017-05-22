import React, { Component } from 'react';

import {Router, Route} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory.js';

//import './App.css';

import Accueil from './accueil/accueil.js'
import Admin from './Admin/Admin.js';

const history = createBrowserHistory();

class App extends Component {

  componentWillMount () {
   // $.post('www.ste.com/api/autenticate', function (data) {
   //   if (data) userConnected = True;
   //});

    this.setState({
      userConnected: true
    })
  }

  render() {
    return (

          <Router history={history}>
            <div>
              {/* <Route path="/" component={Accueil} />*/}
              <Route exact path="/" component={Accueil} />
              <Route path="/accueil" component={Accueil} />
              <Route path="/admin" component={Admin} />
            </div>
          </Router>

    );
  }
}

export default App;