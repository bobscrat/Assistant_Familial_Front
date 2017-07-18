import React, {Component} from 'react';
import { Grid, Form, Header, Button, Message } from 'semantic-ui-react';


import axios from 'axios';
import './Login.css';

class Index extends Component{

    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            familyName:'',
            //familyId: '',
            email: '',
            password: '',
            confirmpassword: '',
            role: {
                id: '1',
                name: 'Admin Familial'
            },
            family: {},
            valideMsg: true,
            errMsg: true
        };
    }

    saveUser = (user) => {
    const self = this;
    return axios.post('/api/users', user)
        .then ( (response) => {
            self.setState({user: response.data});
            return response;
        })
        .catch ( (err) => {
            
            console.log('Failed to get user::', err);
            return err;
        })
    }

handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    this.setState({
        [inputName]: inputValue
    });
};

//Il faut un seul setState par submit
handleSubmit = (e) => {
    const self = this;
    e.preventDefault();
    const inputName = e.target.name;
    const inputValue = e.target.value;
    this.setState({
        [inputName]: inputValue
    });
    console.log('mdp: '+this.state.password + 'confirm: ' + this.state.confirmpassword);
    if(this.state.password === this.state.confirmpassword) {
        console.log('familyName: ' + this.state.familyName);
        let createdFamily;
        axios.post('/api/families', {name: this.state.familyName}) // enregistrer la famille
            .then((response) => {
                createdFamily = response;
                return this.saveUser({
                firstName: this.state.firstName,
                email: this.state.email,
                password: this.state.password,
                role: this.state.role,
                family: response.data
                });
        
                console.log('family name: ' + this.state.family.name);
            })
            .then((response) => {
                self.setState({user: createdFamily.data, valideMsg: false});
                console.log(createdFamily.data);
            })
            .then( () => {
                self.setState({familyName: '', firstName: '', email: '', password: '', confirmpassword: ''})
            })
            .catch((err) => {
                console.log('Failes to create family', err);
                self.setState({errMsg: false})
            })
    }
};


resetField = () => {
    this.setState({
        familyName: '',
        firstName: '',
        email: '',
        password: '',
        confirmpassword: ''
    })
}


render(){
    const valideMsg = this.state.valideMsg;
    const errMsg = this.state.errMsg;
    return (

        <Grid.Column>
            <Header as="h4" className="head-connect">INSCRIPTION</Header>
            <Form onSubmit={this.handleSubmit}>
                <Form.Input placeholder="ex: Ma super Famille" label="Nom de famille" name="familyName"
                            value={this.state.familyName} onChange={this.handleChange} required/>
                <Form.Input placeholder='Votre prénom' label="Prénom" name='firstName' type="text"
                            value={this.state.firstName} onChange={this.handleChange}required/>
                <Form.Input placeholder='Adresse mail' label="Adresse Mail" name='email'  type="email"
                            value={this.state.email} onChange={this.handleChange} required/>
                <Form.Input placeholder='Mot de passe' ref="password" label="Mot de passe" name='password' id="password" type="password"
                            value={this.state.password} onChange={this.handleChange} required/>
                <Form.Input placeholder='Confirmation mot de passe' label="Confirmation mot de passe" id="confirmpassword"
                            name='confirmpassword' type="password"
                            value={this.state.confirmpassword} onChange={this.handleChange} required/>

                <Grid columns="2" textAlign="center">
                    <Grid.Column>
                        <Button onClick={this.resetField}>ANNULER</Button>
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Button positive type='Submit'>INSCRIPTION</Form.Button>
                    </Grid.Column>
                </Grid>
            </Form>
            <Message hidden={valideMsg} positive={!valideMsg}>
                <Message.Header>Inscription réussie</Message.Header>
                    <p>Vouz pouvez vous connecter dès maintenant !!</p>
            </Message>
            <Message hidden={errMsg} error={!errMsg}>
                <Message.Header>Erreur</Message.Header>
                <p>Le nom de famille est déjà utilisé</p>
            </Message>
        </Grid.Column>



)
}
}

export default Index;