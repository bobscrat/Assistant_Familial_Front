import React, {Component} from 'react';
import {Container, Grid, Header, Image} from 'semantic-ui-react';

import LoginIn from './LoginIn.js';
import SignUp from './SignUp.js';
import css from './Login.css';
import img from './logo_olga_white.png';
import ModalDiscovery from'./ModalDiscovery.js';

class Login extends Component{
    render(){
        return(
            <Container>
                <Header as='h1' className="log-header" textAlign='center' >
                    Simplifiez vous la vie avec <Image src={img}/> <br/>
                    Votre planificateur familial d'évènements <ModalDiscovery />
                </Header>
                <Grid columns="2" stackable>
                    <LoginIn getUser={this.props.getUser}/>
                    <SignUp/>
                </Grid>

            </Container>
        )
    }
}
export default Login;
