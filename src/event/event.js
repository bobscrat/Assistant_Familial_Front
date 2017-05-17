import React, {Component} from 'react';
import {Container, Grid, Label, List, Segment, } from 'semantic-ui-react';
import axios from 'axios';

import ModalNewEventPlus from './newEventPlus.js';
import ModalValidEvent from './validEvent.js';

import '../accueil/olga.css';

class Event extends Component {

    componentWillMount() {
        this.state = {
            users: [],
            families: []
        };
        const componentInstance = this;

        axios.get('http://localhost:8080/acdo/api/contact')
        .then( (response) => {
            componentInstance.setState({
                users :response.data
            })
        })
        .catch( (err => {
            console.log('failed to get users :::', err);
        }))
    }
    render() {

        return(
            <Container>  
                <Grid>                                     
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Segment raised>
                                <Label color='orange' ribbon><ModalNewEventPlus /></Label>
                                <List celled verticalAlign='middle'>  
                                    { 
                                        this.state.users.map(
                                            user =>
                                                <List.Item key={user.id}>
                                                    <List.Content floated='right'>
                                                        
                                                        <ModalValidEvent />
                                                        
                                                    </List.Content>
                                                    <List.Icon name='user' />
                                                    <List.Content>
                                                        
                                                        <List.Header>{user.name}</List.Header>
                                                        <List.Description>{user.email}</List.Description>
                                                    </List.Content>
                                                
                                                </List.Item>
                                        )
                                    }
                                </List>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>  
                </Grid>                 
            </Container>

        )
    }
};

export default Event;