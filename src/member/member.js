import React, {Component} from 'react';
import {Container, Grid, Label, List, Segment} from 'semantic-ui-react';
import axios from 'axios';

import ModalNewMember from './newMember.js';
import ModalEditMember from './editMember.js';

import '../accueil/olga.css';

class Member extends Component {

    componentWillMount() {
        this.state = {
            users: [],
            families: []
        };
        const componentInstance = this;

        axios.get('http://localhost:8080/acdo/api/family')
        .then( (response) => {
            componentInstance.setState({
                families :response.data
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
                                <Label color='orange' ribbon>Les membres<ModalNewMember /><ModalEditMember /></Label>
                                <List celled verticalAlign='middle'> 
                                    { 
                                        this.state.families.map(
                                            family =>
                                                <List.Item key={family.id}>
                                                    
                                                    <List.Content>
                                                        <a>{family.name}</a>
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

export default Member;