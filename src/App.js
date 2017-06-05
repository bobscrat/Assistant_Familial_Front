import React, { Component } from 'react';

//import './App.css';

import Site from './Site/Site.js'

class App extends Component {

   constructor(props){
     super(props);

     this.state = {
        logged : false,
         user: {}
     }
   }

    componentDidMount() {
        console.log("App did mount")
        this.checkSessionStorage();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("App did update")
        sessionStorage.setItem('state', JSON.stringify(this.state));
    }

    checkSessionStorage = () => {
        try {
            if (sessionStorage.getItem('state') !== null) {
                this.setState((prevState) => {
                    return prevState = JSON.parse(sessionStorage.getItem('state'))
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    getUser = (boolean, newUser) => {
        this.setState ({
            logged: boolean,
            user: newUser
        })
    }

    logoutUser = () => {
        this.setState ({
            logged: false,
            user: {}
        })
    }
    // render() {
    //     return (
    //         <Accueil />
    //     )
    // }
    render() {
     console.log(this.state.logged)
        return (
          <Site user={this.state.user} logged={this.state.logged} getUser={this.getUser} logoutUser={this.logoutUser} />
        )
    }
}

export default App;