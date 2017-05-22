import React, {Component} from 'react';
import {Container, Grid, Label, List, Segment, Icon} from 'semantic-ui-react';
import axios from 'axios';

import ModalNewMember from './NewUser.js';
import ModalEditMember from './EditUser.js';

import './user.css'
import '../Accueil/olga.css';

class Member extends Component {

    componentWillMount() {
        this.state = {
            users: []
        };
        const componentInstance = this;

        axios.get('http://localhost:8080/api/users')
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
                            <Segment raised className='member'>
                                <Label color='orange' ribbon>Les membres<ModalNewMember /><ModalEditMember /></Label>
                                <List celled verticalAlign='middle' className='listMember'> 
                                    { 
                                        this.state.users.map(
                                            user =>
                                                <List.Item key={user.id}>
                                                    
                                                    <List.Content>
                                                        <Icon name='user' color='orange' /><a>{user.firstName}</a>
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