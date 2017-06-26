import React, {Component} from 'react';
import {Container, Grid, Label, List, Segment, Image, Popup, Message} from 'semantic-ui-react';

import ModalNewEvent from './NewEvent.js';
import ModalValidEvent from './ValidEvent.js';

import './event.css'
import '../Home/olga.css';

class Event extends Component {

  state = {
    events: [],
    family: {}
  };

  componentWillMount() {
    this.setState({events: this.props.events});
  }

  render() {
    return (
      <Container>
        <Grid >
          <Grid.Row>
            <Grid.Column width={16}>
              <Segment raised className='event'>
                <Label color='orange' ribbon>
                  <ModalNewEvent user={this.props.user} family={this.props.family}/>
                </Label>
                <Message color='orange' hidden={this.props.msgHidden}>
                  Aucun événement
                </Message>
                <List celled verticalAlign='middle' className='cadre'>
                  {this.props.events.map((event, i) =>
                    <List.Item key={i}>
                      <List.Content floated='right'>
                        <ModalValidEvent/>
                      </List.Content>
                      <Popup trigger={< Image src={require('../images/avatars/32x32/' + (event.user.image))} avatar />}>
                        {event.user.firstName}
                      </Popup>
                      <List.Content>
                        <List.Header>
                          <Popup trigger={<a>{event.name}</a>} wide='very'>
                            <Popup.Header>Détails de {event.name}</Popup.Header>
                            <Popup.Content>
                              <List>
                                <List.Item>Membre : {event.user.firstName}.</List.Item>
                                <List.Item>Catégorie : {event.category.name}.</List.Item>
                                {event.project && <List.Item>Projet : {event.project.name}</List.Item>}
                                {event.estimatedBudget && <List.Item>Budget prévisionnel : {event.estimatedBudget}
                                  €</List.Item>}
                                {event.realizedBudget && <List.Item>Budget réalisé : {event.realizedBudget}
                                  €</List.Item>}
                                {event.comment && <List.Item>Commentaire : {event.comment}</List.Item>}
                              </List>
                            </Popup.Content>
                          </Popup>
                          <Popup trigger={event.priority.id === 2 && <List.Icon name='attention' color='orange'/>}>
                            Important
                          </Popup>
                          <Popup trigger={event.priority.id === 4 && <List.Icon name='attention' color='orange'/>}>
                            Important
                          </Popup>
                        </List.Header>
                        <List.Description>
                          <List.Icon name='calendar' color='orange'/> {event.deadline[2]}/{event.deadline[1]}/{event.deadline[0]} {event.deadline[3] !== 0 && <List.Icon name='time' color='orange'/>}
                          {event.deadline[3] !== 0 && event.deadline[3] + 'h'}
                          {event.deadline[3] > 0 && event.deadline[4] < 10 && '0'}
                          {event.deadline[3] > 0 && event.deadline[4]}
                          <Popup trigger={event.priority.id === 3 && <List.Icon name='bell' color='orange'/>}>
                            Urgent
                          </Popup>
                          <Popup trigger={event.priority.id === 4 && <List.Icon name='bell' color='orange'/>}>
                            Urgent
                          </Popup>
                        </List.Description>
                      </List.Content>
                    </List.Item>)
                  }
                </List>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )}
};

export default Event;
