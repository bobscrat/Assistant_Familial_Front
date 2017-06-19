import React, {Component} from 'react';
import {Container, Grid, Header} from 'semantic-ui-react';

import LoginIn from './LoginIn.js';
import SignUp from './SignUp.js';
import css from './Index.css';

class Login extends Component{
    render(){
        return(
            <Container>
                {/*<Grid columns="2" stackable="1">*/}
                <Header  className="log-header" size="large" textAlign="center">Simplifiez-vous la vie avec OLGA <br />Votre planificateur familial d'évènements</Header>
                <Grid columns="2" stackable>
                    <LoginIn getUser={this.props.getUser}/>
                    <SignUp/>
                </Grid>

            </Container>
        )
    }
}

export default Login;