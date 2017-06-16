import React, { Component } from 'react';
import {Router, Route} from "react-router";
import createBrowserHistory from "history/createBrowserHistory";

import Home from '../Home/Home.js'
import Admin from '../Admin/Admin.js';
import Login from '../Login/Login.js';

const history = createBrowserHistory();


class Site extends Component{
    redirection = () => {
        history.push("/");
    }

    login= () => {
        return <Login getUser={this.props.getUser}/>
    }

    home = () => {
        return <Home logged={this.props.logged} user={this.props.user} logoutUser={this.props.logoutUser} redirect={this.redirection}/>
    }

    admin = () => {
        return <Admin logged={this.props.logged} user={this.props.user} logoutUser={this.logoutUser} redirect={this.redirection} />
    }

    componentDidUpdate() {
        console.log("component did update <site.js>")
        this.props.logged ? ( history.push('/home') ) : (history.push('/') );
    }

    render(){
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" render={this.login} />
                    <Route path="/home" render={this.home} />
                    <Route path="/admin" render={this.admin} />
                </div>
            </Router>
        )
    }
}

export default Site;
