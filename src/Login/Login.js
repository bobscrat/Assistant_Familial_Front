import React, {Component} from 'react';
import {Container, Grid, Header, Image} from 'semantic-ui-react';

import LoginIn from './LoginIn.js';
import SignUp from './SignUp.js';
import css from './Login.css';
import img from './logo_olga_white.png';

class Login extends Component{
    render(){
        return(
            <Container>
                <Header  className="log-header" textAlign='center' size="large">Simplifiez vous la vie avec <Image src={img} /> <br/>Votre planificateur familial d'évènements</Header>
                <Grid columns="2" stackable>
                    <LoginIn getUser={this.props.getUser}/>
                    <SignUp/>
                </Grid>

            </Container>
        )
    }
}

export default Login;