import React, {Component} from 'react';
import {Container, Grid, Label, List, Segment, Image} from 'semantic-ui-react';
import axios from 'axios';

import ModalNewMember from './NewUser.js';
import ModalEditMember from './EditUser.js';

import './user.css'
import '../Accueil/olga.css';

class Member extends Component {

    componentWillMount() {
        this.state = {
            users: [],
        };
        const componentInstance = this;
       
        axios.get('/api/users')
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
                                <List verticalAlign='middle' className='listMember'> 
                                    { 
                                        this.state.users.map(
                                            user =>
                                                <List.Item key={user.id}>                                                    
                                                    <List.Content>
                                                        {/*<Label as='a' basic image >
                                                            <img src={require('../images/avatars/32x32/' + user.image)} />
                                                            {user.firstName}
                                                        </Label>*/}
                                                        <Image src={require('../images/avatars/32x32/' + user.image)} avatar />
                                                        <a>{user.firstName}</a>
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