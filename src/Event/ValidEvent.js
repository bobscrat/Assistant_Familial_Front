import React, {Component} from 'react';
import { Popup, Button, Modal, Icon, Form } from 'semantic-ui-react';
import {saveEvent, updateEvent} from './libEvent.js';
import '../Home/olga.css';

class ModalValidEvent extends Component {
  state = {
    open: false,
    myEvent: {},
    child: {},
    childName: '',
    childYear: '',
    childMonth: '',
    childDay: '',
    childHour: '',
    childMin: '',
    childComment: '',
    childBudget: 0,
    showForm: false
  }

  show = (dimmer) => () => this.setState({ dimmer, open: true, myEvent: this.props.myEvent, showForm: false })

  close = () => this.setState({ open: false })

  validate = () => {
    this.markAsDone(this.state.myEvent);
    if (this.state.myEvent.hasChild) {
      let child = this.createEventChild(this.state.myEvent);
      let budget = (child.estimatedBudget) ? child.estimatedBudget : 0;
      this.setState({showForm: true, child: child, childName: child.name, childYear: '', childMonth: '', childDay: '', childHour: '', childMin: '', childComment: child.comment, childBudget: budget});
    } else {
      this.props.rload();
      this.close();
    }
  }

  markAsDone = (event) => {
    // mark event as done
    event.done = true;
    updateEvent(event);
    // if event has a periodicity
    if (event.periodicity.id > 1) {
      const newEvent = this.createNextEvent(event);
      let year = event.deadline[0];
      let month = event.deadline[1];
      let day = event.deadline[2];
      let hour = event.deadline[3];
      let min = event.deadline[4];
      let newDay, newMonth, newYear, newDeadline;
      switch (event.periodicity.id) {
        // day
        case 2:
          newDay = day + event.periodicityValue;
          // new Date : months are from 0 to 11
          // Date.UTC or else hour is modified (-2h)
          newDeadline = new Date(Date.UTC(year, month-1, newDay, hour, min));
          break;
        // 1 week = 7 days
        case 3:
          newDay = day + (event.periodicityValue * 7);
          newDeadline = new Date(Date.UTC(year, month-1, newDay, hour, min));
          break;
        // month
        case 4:
          newMonth = (month - 1) + event.periodicityValue;
          newDeadline = new Date(Date.UTC(year, newMonth, day, hour, min));
          break;
        // year
        case 5:
          newYear = year + event.periodicityValue;
          newDeadline = new Date(Date.UTC(newYear, month-1, day, hour, min));
          break;
        default:
        newDeadline = new Date(Date.UTC(year, month-1, day, hour, min));
      }
      newEvent.deadline = newDeadline;
      // other proprieties
      newEvent.hasChild = event.hasChild;
      newEvent.periodicity = event.periodicity;
      newEvent.periodicityValue = event.periodicityValue;
      // create newEvent
      saveEvent(newEvent).then(() => {this.props.rload();})
      .catch((err) => {
        console.log('failed to save newEvent :::', err);
      })
    }
  }

  createNextEvent = (event) => {
    const nextEvent = {};
    // generic event : blank id, periodicity(Value), deadline, realizedBudget
    nextEvent.name = event.name;
    nextEvent.user = event.user;
    nextEvent.family = event.family;
    nextEvent.done = false;
    nextEvent.category = event.category;
    nextEvent.project = event.project;
    nextEvent.priority = event.priority;
    nextEvent.contact = event.contact;
    nextEvent.comment = event.comment;
    nextEvent.estimatedBudget = event.estimatedBudget;
    return nextEvent;
  }

  createEventChild = (event) => {
    let child = this.createNextEvent(event);
    child.name = child.name.slice(4); // remove PRV_
    child.hasChild = false;
    child.parentEvent = event;
    return child;
  }

  handleChange = (ev) => {
    const target = ev.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  saveChild = () => {
    let eventChild = this.state.child;
    eventChild.deadline = new Date(Date.UTC(this.state.childYear, this.state.childMonth-1, this.state.childDay, this.state.childHour, this.state.childMin));
    eventChild.name = this.state.childName;
    eventChild.comment = this.state.childComment;
    eventChild.budget = this.state.childBudget;
    saveEvent(eventChild).then((response) => {
      this.setState({child: response});
      this.props.rload();
      console.log("child enregistré");
      this.close();
    })
    .catch((err) => {
      console.log('failed to save Event Child :::', err);
    })
  }

  render() {
    const { open, dimmer } = this.state;
    return (
      <div>

        <Popup trigger={<Icon link color='green' size='large' name='checkmark' onClick={this.show(true)}/>}>
          <Popup.Header>Terminer cet événement</Popup.Header>
          <Popup.Content>
            En cliquant sur ce bouton, vous marquez cet événement comme terminé.
          </Popup.Content>
        </Popup>

        <Modal dimmer={dimmer} open={open} onClose={this.close}  closeIcon='close'>
          <Modal.Header>
            {(!this.state.showForm) && <p>Terminer cet événement</p>}
            {(this.state.showForm) && <p>Enregistrer le rendez-vous associé</p>}
          </Modal.Header>
          <Modal.Content>
            {(!this.state.showForm) && <Modal.Description>
              Voulez-vous marquer cet événement comme terminé ?
              </Modal.Description>}
            {(this.state.showForm) &&
              <Form onSubmit={this.saveChild} >
                <Form.Input label='Nom' name='childName' type='text' value={this.state.childName} onChange={this.handleChange} />
                <Form.Group>
                  <Form.Input label='Jour' name='childDay' value={this.state.childDay} placeholder='JJ' type='number' min='1' max='31' onChange={this.handleChange} required width={2} />
                  <Form.Input label='Mois' name='childMonth' value={this.state.childMonth} placeholder='MM' type='number' min='1' max='12' onChange={this.handleChange} required width={2} />
                  <Form.Input label='Année' name='childYear' value={this.state.childYear} type='number' min='2017' placeholder='AAAA' onChange={this.handleChange} required width={2} />
                  <Form.Input label='Heure' name='childHour' value={this.state.childHour} type='number' min='0' max='23' placeholder='HH' onChange={this.handleChange} width={2} />
                  <Form.Input label='Minutes' name='childMin' value={this.state.childMin} type='number' min='0' max='59' placeholder='mm' onChange={this.handleChange} width={2} />
                </Form.Group>
                <Form.Input label='Commentaire' name='childComment' type='text' value={this.state.childComment} placeholder='Ajoutez un commentaire' onChange={this.handleChange} />
                <Form.Group inline>
                  <Form.Input label='Budget estimé (€)' name='childBudget' type='number' min='0' value={this.state.childBudget} onChange={this.handleChange} />
                </Form.Group>
                <p>Concerné : {this.state.child.user.firstName}</p>
                <p>Catégorie : {this.state.child.category.name}</p>
                {(this.state.child.project) && <p>Projet : {this.state.child.project.name}</p>}
                {(this.state.child.priority) && <p>Priorité : {this.state.child.priority.name}</p>}
                {(this.state.child.contact) && <p>Contact : {this.state.child.contact.first_name} {this.state.child.contact.name}</p>}
              </Form>}
          </Modal.Content>
          <Modal.Actions>
            {(!this.state.showForm) && <div>
              <Button color='orange' content='Non' onClick={this.close} />
              <Button positive content='Oui' onClick={this.validate} />
            </div>}
            {(this.state.showForm) &&<div>
              <Button color='orange' content='Annuler' onClick={this.close} />
              <Button positive content='Enregistrer' onClick={this.saveChild} />
            </div>}
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}
export default ModalValidEvent;
