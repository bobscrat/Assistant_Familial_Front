import React, {Component} from 'react';
import { Popup, Button, Modal, Icon} from 'semantic-ui-react';
import axios from 'axios';

import'./event.css';
import Modal1 from './Modal1.js';
import Modal2 from './Modal2.js';
import Modal3 from './Modal3.js';
import Modal4 from './Modal4.js';
import Modal5 from './Modal5.js';

class ModalNewEvent extends Component {

  constructor(props) {
        super(props);
        this.state = {
            events: [],
            open : false,
            numero: 1,
            nbModal: 5,
            listModal: ['showModal1', 'showModal2', 'showModal3', 'showModal4', 'showModal5'],
            showModal: [true, false, false, false, false],
            prefixe: 'RDV_',
            nameEvent: '',
            dateEvent: '',
            nameUser: '',
            nameCategory: '',
            nameProject: '',
            priority: 1,
            valuePeriodicity:0,
            periodicity: 1,
            contactEvent: '',
            budgetEvent: '',
            commentEvent: '',
            family: {},
            event: {}
         }
    };

  addPrefixe = (myPrefixe) => {
      console.log('test ' + myPrefixe);
        this.setState({prefixe: myPrefixe});
  }

  updateStatePrefixe = (e) => {
        this.setState({prefixe: e.target.value});
  }

  updateStateNameEvent = (e) => {
      var validNameEvent = false
        if (e.target.value.length > 2) {
          validNameEvent = true;
        }
        this.setState({
          nameEvent: e.target.value,
        });
        // this.state.event.name = this.state.prefixe + this.state.nameEvent
        console.log("valid : " + validNameEvent + ' ' + this.state.nameEvent + ' ' + this.state.event.name);
  }

  updateStateDateEvent = (e) => {
        this.state.event.deadline = e.target.value;
        this.setState({dateEvent: e.target.value});
  }

  updateStateNameUser = (e) => {
      this.state.event.user_id = 2
      this.setState({nameUser: e.target.value});
  }

  updateStateNameCategory = (e) =>{
        this.state.event.category_id = 2
        this.setState({nameCategory: e.target.value});
  }

  updateStateNameProject = (e) => {
        this.state.event.project_id = 1
        this.setState({nameProject: e.target.value});
  }

  updateStatePeriodicity = (mesure) => {
        this.state.event.periodicity_id = mesure
        this.setState({periodicity: mesure});
  }

  updateStateValuePeriodicity = (mesure) => {
      this.state.event.periodicityValue = mesure
     console.log('mesure : ' + mesure)
        // if (mesure >= 0) {
          this.setState({valuePeriodicity: mesure});
        // }
        console.log('valuePeriodicity = ' + this.state.valuePeriodicity);
  }

  updateStatePriority = (mesure) => {
        this.state.event.priority_id = mesure
        this.setState({priority: mesure});
  }

  updateStateContactEvent = (contact) =>{
      this.state.event.contact_id = 2;
      this.setState({contactEvent: contact});
  }

  updateStateBudgetEvent = (e) =>{
      this.setState({budgetEvent: e.target.value});
  }

  updateStateCommentEvent = (e) =>{
      this.setState({commentEvent: e.target.value});
  }

  closeConfigShow = (closeOnEscape, closeOnRootNodeClick) => () => {
    this.setState({ closeOnEscape, closeOnRootNodeClick, open: true })
  }

  show = (dimmer) => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  onClickNext(e){
    //Validation
    var valid = false;
    switch(this.state.numero)  {
      case 1: //Modal1
        if (null != this.state.nameEvent && this.state.nameEvent.length > 2) {
          valid = true;
        }
        if (null != this.state.dateEvent && this.state.dateEvent.length === 10 && valid === true) {
          valid = true;
        }else{
          valid = false;
        }
        break;
      case 2: //Modal2
        if (null != this.state.nameUser && this.state.nameUser.length > 2) {
          valid = true;
        }
        if (null != this.state.nameCategory && this.state.nameCategory.length > 2 && valid === true) {
          valid = true;
        }else{
          valid = false;
        }
        break;
      default:
    }
    console.log('valid = ' + valid);
    valid = true;
    if (valid === true) {
      if (this.state.numero < this.state.nbModal) {
        e.preventDefault();
        var trouve=0;
        for (var i = 0; i < this.state.nbModal; i++){
          if (trouve === 1) { //si le component est trouvé le suivant est true
          //if (trouve === 1 && valid === 1) { //si le component est trouvé le suivant est true
              this.state.showModal[i] = true;
              this.state.numero = i + 1;
              trouve = 0;
          }else{
              if (this.state.showModal[i] === true && trouve === 0) { //si le component n'est pas trouvé le component est false
                  this.state.showModal[i]= false;
                  trouve = 1;
              }
          }
        }
        console.log('name = ' + this.state.prefixe + this.state.nameEvent);
        console.log('date = ' + this.state.dateEvent);
        console.log('user = ' + this.state.nameUser);
        console.log('category = ' + this.state.nameCategory);
        console.log('project = ' + this.state.nameProject);
        console.log('value periodicity = ' + this.state.valuePeriodicity);
        console.log('periodicity = ' + this.state.periodicity);
        console.log('priority = ' + this.state.priority);
        console.log('contact = ' + this.state.contactEvent);
        console.log('budget = ' + this.state.budgetEvent);
        console.log('comment = ' + this.state.commentEvent);
        console.log('family = ' + this.props.family.id);
        this.setState({})
      }
    }
  }

  onClickPrevious(e){
    if (this.state.numero > 1) {
      e.preventDefault();
      var trouve=0;
      for (var i = this.state.nbModal; i >= 0; i--){
        if (trouve === 1) {
            this.state.showModal[i]= true;
            this.state.numero = i + 1;
            trouve = 0;
        }else{
            if (this.state.showModal[i] === true && trouve === 0) {
                this.state.showModal[i]= false;
                trouve = 1;
            }
        }
      }
      this.setState({})
    }
  }

  createEvent = (myEvent) => {


    console.log('create ' + myEvent.name)
      axios.post('/api/events', myEvent)
        .then((response) => {
          const myEvent= response.data;
          console.log('post');
          this.setState({event: myEvent})


          // this.props.test(true);
          this.close();
        })
        .catch((err) => {
          console.log('Failed to create Event : ', err);
      })
    }

  render() {
    const { open, dimmer, closeOnEscape, closeOnRootNodeClick  } = this.state;

    return (
      <div>
        Les évènements
        <Popup trigger={<Icon link name='plus' size='large' onClick={this.show(true)}/>}>
          <Popup.Header>Créer un évènement</Popup.Header>
          <Popup.Content>
            En cliquant sur ce bouton, vous créez un nouvel évènement pour un membre de votre famille.
          </Popup.Content>
        </Popup>
        <Modal
          dimmer={dimmer}
          closeOnRootNodeClick={closeOnRootNodeClick}
          closeOnEscape={closeOnEscape}
          open={open}
          onClose={this.close}
          closeIcon='close'
        >
            <Modal.Header>
              Ajouter un nouvel évènement {this.state.numero}/{this.state.nbModal}
            </Modal.Header>

            <Modal.Content>
              <Modal.Description>
                {this.state.showModal[0] && < Modal1
                  myPrefixe={this.state.prefixe}
                  addPrefixeProp={this.addPrefixe}
                  myNameEvent={this.state.nameEvent}
                  updateStateNameEventProp={this.updateStateNameEvent}
                  myDateEvent={this.state.dateEvent}
                  updateStateDateEventProp={this.updateStateDateEvent}
                />}
                {this.state.showModal[1] && < Modal2
                  myNameUser={this.state.nameUser}
                  updateStateNameUserProp={this.updateStateNameUser}
                  myNameCategory={this.state.nameCategory}
                  updateStateNameCategoryProp={this.updateStateNameCategory}
                  myNameProject={this.state.nameProject}
                  updateStateNameProjectProp={this.updateStateNameProject}
                />}
                {this.state.showModal[2] && < Modal3
                  myPriority={this.state.priority}
                  updateStatePriorityProp={this.updateStatePriority}
                  myPeriodicity={this.state.periodicity}
                  updateStatePeriodicityProp={this.updateStatePeriodicity}
                  myValuePeriodicity={this.state.valuePeriodicity}
                  updateStateValuePeriodicityProp={this.updateStateValuePeriodicity}
                />}
                {this.state.showModal[3] && < Modal4
                  myContactEvent={this.state.contactEvent}
                  updateStateContactEventProp={this.updateStateContactEvent}
                />}
                {this.state.showModal[4] && < Modal5
                  myBudgetEvent={this.state.budgetEvent}
                  updateStateBudgetEventProp={this.updateStateBudgetEvent}
                  myCommentEvent={this.state.commentEvent}
                  updateStateCommentEventProp={this.updateStateCommentEvent}
                />}
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              {this.state.numero > 1 && <Button content='Précédent' icon='left chevron' labelPosition='left' onClick={this.onClickPrevious.bind(this)} />}
              {this.state.numero === 1 && <Button disabled content='Précédent' icon='left chevron' labelPosition='left' onClick={this.onClickPrevious.bind(this)} />}
              <Button color='orange' onClick={this.close}>
                Annuler
              </Button>
              {this.state.numero < 5 && <Button positive icon='right chevron' labelPosition='right' content='Suivant' onClick={this.onClickNext.bind(this)} />}
              {this.state.numero === 5 && <Button positive icon='checkmark' labelPosition='right' content='Valider' onClick={this.createEvent} />}
            </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default ModalNewEvent
