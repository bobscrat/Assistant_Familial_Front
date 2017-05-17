import React, { Component } from 'react';

//import RouterComponent from './routeur/router.js';

//import './App.css';

import Accueil from './accueil/accueil.js'

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
        
          <Accueil /> 
       
    );
  }
}

export default App;
