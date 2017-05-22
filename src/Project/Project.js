import React, {Component} from 'react';
import {Container, Grid, Label, List, Segment, Icon } from 'semantic-ui-react';
import axios from 'axios';

import ModalNewProject from './NewProject.js';
import ModalEditProject from './EditProject.js';

import './project.css'
import '../Accueil/olga.css';

class Project extends Component {

    componentWillMount() {
        this.state = {
            projects: []
        };
        const componentInstance = this;

        axios.get('http://localhost:8080/api/projects')
        .then( (response) => {
            componentInstance.setState({
                projects :response.data
            })
        })
        .catch( (err => {
            console.log('failed to get projects :::', err);
        }))
    }
    render() {

        return(
            <Container >  
                <Grid>                                     
                    <Grid.Row >
                        <Grid.Column width={16}>
                            <Segment raised className="project">
                                <Label color='orange' ribbon><ModalNewProject /><ModalEditProject /></Label>
                                <List celled verticalAlign='middle'>  
                                    { 
                                        this.state.projects.map(
                                            project =>
                                                <List.Item key={project.id}>
                                                    
                                                    <List.Content>
                                                        <Icon name='folder' color='orange' /><a>{project.name}</a>
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