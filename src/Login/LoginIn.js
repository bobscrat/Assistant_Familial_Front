import React, {Component} from 'react';
import {Grid, Form, Header} from 'semantic-ui-react';

import axios from 'axios';

class LoginIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        this.setState({
            [inputName]: inputValue
        });
    };

    handleSubmit = (e) => {
        const componentInstance = this;
        e.preventDefault();

        let user = {};
        user["email"] = this.state.email;
        user["password"] = this.state.password;
        console.log("email: " + user["email"] + " password : " + user["password"]);
        axios.post("/api/users/log", user)
            .then((response) => {
                console.log('ok')
                componentInstance.props.getUser(true, response.data);

            })
            .catch((error) => {
                console.log("erreur")
            });
    }




    render(){
        return (
            <Grid.Column id="connexion">
                <Header as="h4" className="head-connect">CONNEXION</Header>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input label="Adresse Mail" name="email" value={this.state.email} onChange={this.handleChange}/>
                    <Form.Input label="Mot de passe" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <div><a href="#">Mot de passe oublié?</a></div>
                    <Grid columns="1" textAlign="right">
                        <Grid.Column>
                            <Form.Button positive type='submit'>CONNEXION</Form.Button>
                        </Grid.Column>
                    </Grid>
                </Form>
            </Grid.Column>
        )
    }
}

export default LoginIn;