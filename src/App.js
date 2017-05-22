import React, { Component } from 'react';

import Accueil from './Accueil/Accueil.js'

class App extends Component {

  componentWillMount () {

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
