import React, {Component} from 'react';
import {Container, Grid, Form, Header, Button, Message} from 'semantic-ui-react';


import axios from 'axios';
import './Index.css';

class Index extends Component{

    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            familyName:'',
            familyId: '',
            email: '',
            password: '',
            confirmpassword: '',
            role: {
                id: '1',
                name: 'Admin Familial'
            },
            family: {}
        };
    }

    saveUser = (user) => {
    const componentInstance = this;

    axios.post('http://localhost:8080/api/users', user)
.then ( (response) => {
    componentInstance.setState({user: response.data});
})
.catch ( (err) => {
    console.log('Failed to get user::', err);
})
}
// saveFamily = (family) => {
//     const componentInstance = this;
//     axios.post('http://localhost:8080/api/family', family)
//         .catch( (err) => {
//             console.log('Failes to create family', err);
//         })
//
// }

handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    this.setState({
        [inputName]: inputValue
    });
};

//Il faut un seul setState par submit
handleSubmit = (e) => {
    const componentInstance = this;
    e.preventDefault();
    const inputName = e.target.name;
    const inputValue = e.target.value;
    this.setState({
        [inputName]: inputValue
    });
    console.log('mdp: '+this.state.password + 'confirm: ' + this.state.confirmpassword);
    if(this.state.password === this.state.confirmpassword) {
        console.log('familyName: ' + this.state.familyName);
        axios.post('http://localhost:8080/api/families', {name: this.state.familyName}) // enregistrer la famille
            .then((response) => {
            this.saveUser({
            firstName: this.state.firstName,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role,
            family: response.data
        });

        console.log('family id: ' + this.state.family.id + ', family name: ' + this.state.family.name);
    })
    .then((response) => {
            componentInstance.setState({user: response.data});
    })
    .catch((err) => {
            console.log('Failes to create family', err);
    })
        console.log('family id: ' + this.state.family.id);
    }
};

// login = (e) => {
//     const componentInstance = this;
//     e.preventDefault();
//     const inputName = e.target.name;
//     const inputValue = e.target.value;
//     this.setState({
//         [inputName]: inputValue
//     });
//     axios.post('http://localhost:8080/api/users', user)
// }

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
    return (

        <Grid.Column>
            <Header as="h4" className="head-connect">INSCRIPTION</Header>
            <Form onSubmit={this.handleSubmit}>
                <Form.Input placeholder="Nom de votre famille" label="Nom de famille" name="familyName"
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
        </Grid.Column>



)
}
}

export default Index;