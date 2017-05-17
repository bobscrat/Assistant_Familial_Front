import React, {Component} from 'react';
import {Container, Grid, Label, List, Segment } from 'semantic-ui-react';
import axios from 'axios';

import ModalNewProject from './newProject.js';
import ModalEditProject from './editProject.js';

import '../accueil/olga.css';

class Project extends Component {

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
            console.log('failed to get families :::', err);
        }))
    }
    render() {

        return(
            <Container>  
                <Grid>                                     
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Segment raised>
                                        <Label color='orange' ribbon><ModalNewProject /><ModalEditProject /></Label>
                                        <List celled verticalAlign='middle'>  
                                            { 
                                                this.state.users.map(
                                                    user =>
                                                        <List.Item key={user.id}>
                                                            
                                                            <List.Content>
                                                                {user.name}
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

export default Project;