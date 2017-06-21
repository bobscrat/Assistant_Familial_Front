import React, {Component} from 'react';
import {Grid, Form, Header, Modal, Message} from 'semantic-ui-react';
import ModalPassword from './Password.js';
import axios from 'axios';
import css from './Login.css';

class LoginIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errMsg: true
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
        const self = this;
        e.preventDefault();

        let user = {};
        user["email"] = this.state.email;
        user["password"] = this.state.password;
        console.log("email: " + user["email"] + " password : " + user["password"]);
        axios.post("/api/users/log", user)
            .then((response) => {
                console.log(response)
                if(response.data !== ''){
             self.props.getUser(true, response.data);
                } 
                if(response.data === ''){
                    console.log("coucou");
                 self.setState({errMsg: false})
                }
            })
            .catch((error) => {
                console.log("erreur");
             self.setState({errMsg: false})
            });
    }



    render(){
        const errMsg = this.state.errMsg;
        return (
            <Grid.Column id="connexion">
                <Header as="h4" className="head-connect">CONNEXION</Header>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input label="Adresse Mail" type="email" name="email" value={this.state.email} onChange={this.handleChange}/>
                    <Form.Input label="Mot de passe" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <ModalPassword/>
                    <Grid columns="1" textAlign="right">
                        <Grid.Column>
                            <Form.Button positive type='submit'>CONNEXION</Form.Button>
                        </Grid.Column>
                    </Grid>
                </Form>
                <Message hidden={errMsg} error={!errMsg}>
                <Message.Header>Informations incorrectes</Message.Header>
                    <p>Votre adresse e-mail et/ou votre mot de passe ne sont pas valides</p>
                </Message>
            </Grid.Column>
           
        )
    }
}

export default LoginIn;