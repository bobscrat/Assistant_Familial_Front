import React, {Component} from 'react';
import {Container, Grid, Label, List, Segment, Icon, Image} from 'semantic-ui-react';
import axios from 'axios';

import ModalNewMember from './NewUser.js';
import ModalEditMember from './EditUser.js';

import './user.css'
import '../Accueil/olga.css';
import img from '../images/avatars/32x32/01-32x32.png';

class Member extends Component {

    componentWillMount() {
        this.state = {
            users: [],
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
                                                        <Label as='a' image >
                                                            <img src={require('../images/avatars/32x32/'+user.image)} />
                                                            {user.firstName}
                                                        </Label>
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