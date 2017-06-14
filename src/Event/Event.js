import React, {Component} from 'react';
import {Container, Grid, Label, List, Segment, Image } from 'semantic-ui-react';
import axios from 'axios';

import ModalNewEvent from './NewEvent.js';
import ModalValidEvent from './ValidEvent.js';

import './event.css'
import '../Accueil/olga.css';

class Event extends Component {

    componentWillMount() {
        this.state = {
            events: [],
            members: [],
            family: {}
        };
        const componentInstance = this;

        axios.get('/api/events')
        .then( (response) => {
            componentInstance.setState({
                events :response.data
            })
        })
        .catch( (err => {
            console.log('failed to get events :::', err);
        }))
    }
    render() {

        // const lesdates = Object.keys(this.state.events.deadline);
        // console.log(lesdates);

        return(
            <Container>  
                <Grid >                                     
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Segment raised className='event'>
                                <Label color='orange' ribbon><ModalNewEvent user={this.props.user} family={this.props.family} /></Label>
                                <List celled verticalAlign='middle' className='cadre'>  
                                    { 
                                        this.state.events.map(
                                            (event, i) =>
                                                <List.Item key={i}>
                                                    <List.Content floated='right'>
                                                        
                                                        <ModalValidEvent />
                                                        
                                                    </List.Content>
                                                    <List.Icon name='calendar' color='orange' />
                                                    {/*<Image src={require('../images/avatars/32x32/'+ (event.image))} avatar/>*/}
                                                    <List.Content>
                                                        
                                                        <List.Header as='a'>{event.name}</List.Header>
                                                        <List.Description>{event.deadline} {event.user_id}</List.Description>
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