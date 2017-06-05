import React, {Component} from 'react';
import {Container, Grid} from 'semantic-ui-react';

import LoginIn from './LoginIn.js';
import SignIn from './SignIn.js';

class Login extends Component{
    render(){
        return(
            <Container>
                {/*<Grid columns="2" stackable="1">*/}
                <Grid columns="2" stackable>
                    <LoginIn getUser={this.props.getUser}/>
                    <SignIn/>
                </Grid>
            </Container>
        )
    }
}

export default Login;