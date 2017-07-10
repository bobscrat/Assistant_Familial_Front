import React, {Component} from 'react';
import { Popup, Button, Modal, Icon} from 'semantic-ui-react';
import axios from 'axios';

import'./event.css';
import Modal1 from './Modal1.js';
import Modal2 from './Modal2.js';
import Modal3 from './Modal3.js';
import Modal4 from './Modal4.js';
import Modal5 from './Modal5.js';

import {loadMembers} from '../Member/libMember.js';
import {loadCategories} from '../Category/libCategory.js';
import {loadProjects} from '../Project/libProject.js';
import {loadContacts} from '../Contact/libContact.js';
import {loadPeriodicities} from './libEvent.js';
import {loadPriorities} from './libEvent.js';

class ModalNewEvent extends Component {

  constructor(props) {
        super(props);
        this.state = {
            events: [],
            open : false,      
            addedEvent: {},
            numero: 1,
            nbModal: 5,
            listModal: ['showModal1', 'showModal2', 'showModal3', 'showModal4', 'showModal5'],
            showModal: [true, false, false, false, false],
            prefixe: '',
            nameEvent: '',
            dateEvent: '',
            hourEvent: 'x',
            minuteEvent: 'x',
            nameMember: '',
            nameCategory: '',
            nameProject: '',
            priorityName: 'Aucune', 
            valuePeriodicity: 0,
            periodicityName: 'Aucune',
            contactEvent: '',
            budgetEvent: 0,
            commentEvent: '',
            members: [],
            categories: [],
            projects: [],
            contacts: [],
            priorities: [],
            periodicities: [],
            family: {},
            member: {},
            category: {},
            project: null,
            priority: {id: 1, name: 'Aucune'},
            periodicity: {id: 1, name: 'Aucune'},
            contact: null,
            deadline: '',
            mess1M1: 'none',
            mess2M1: 'none',
            mess3M1: 'none',
            mess4M1: 'none',
            mess1M2: 'none',
            mess2M2: 'none',
            mess1M3: true,
            messM5: true,
            messClose: false
         } 
    };

  componentWillMount() {
   
    let members = [];
    let categories = [];
    let projects = [];
    let contacts = [];
    let periodicities = [];
    let priorities = [];
    
    loadMembers(2, true) // must replace 2 by family.id in prod
      .then((response) => {
        members = response;
        return loadCategories(2, true);
      }).then((response) => {
          categories = response;
          return loadProjects(2, true);
      }).then((response) => {
          projects = response;
          return loadPeriodicities();
      }).then((response) => {
          periodicities = response;
          return loadPriorities();
      }).then((response) => {
          priorities = response;
          return loadContacts(2,false);
      }).then((response) => {
          contacts = response
          this.setState({
            members: members,
            categories: categories,
            projects: projects,
            priorities: priorities,
            periodicities: periodicities,
            contacts: contacts
        });
      }).catch((err => {
        console.log('failed to get Home data :::', err);
      }));
  }

  reloadContacts = () => {
    console.log('reloadContacts');
    loadContacts(this.props.family.id, true).then((response) => {
        this.setState({contacts: response})
    })
    .catch((err) => {
    console.log('failed to get Contacts :::', err);
    })
  }

  addPrefixe = (myPrefixe) => {
    console.log("pref " + myPrefixe);
        this.setState({prefixe: myPrefixe});
  }

  updateStatePrefixe = (e) => {
        this.setState({prefixe: e.target.value});
  }

  updateStateNameEvent = (e) => {
    var validNameEvent = false
    if (e.target.value.length > 2 && e.target.value.length <= 45) {
      validNameEvent = true;
      this.setState({
        mess1M1: 'none'
      });
    }
    this.setState({
      nameEvent: e.target.value,
    });
  }

  updateStateDateEvent = (laDate) => {
    if (null !== laDate) {
      this.setState({
        mess2M1: 'none'
      });
    }
    this.setState({dateEvent: laDate});        
  }

  updateStateHourEvent = (e) => {
    if (null !== e.target.value) {
      this.setState({
        mess3M1: 'none'
      });
    }
    this.setState({hourEvent: e.target.value});
  }

  updateStateMinuteEvent = (e) => {
    if (null !== e.target.value) {
      this.setState({
        mess4M1: 'none'
      });
    }
    this.setState({minuteEvent: e.target.value });
  }

  updateStateNameMember = (e) => {
    let memberSelected = {};
    for (var i=0; i < this.state.members.length; i++) {
      if (this.state.members[i].firstName === e.target.value) {
        memberSelected = this.state.members[i];
      } 
    }
    if (null !== e.target.value) {
      this.setState({
        mess1M2: 'none'
      });
    }
    this.setState({
      nameMember: e.target.value,
      member: memberSelected
    });
  }

  updateStateNameCategory = (e) =>{
    let categorySelected = {};
    for (var i=0; i < this.state.categories.length; i++) {
      if (this.state.categories[i].name === e.target.value) {
        categorySelected = this.state.categories[i];        
      } 
    }
    if (null !== e.target.value) {
      this.setState({
        mess2M2: 'none'
      });
    }
    this.setState({
      nameCategory: e.target.value,
      category: categorySelected
    });
  }

  updateStateNameProject = (e) =>{
    let projectSelected = {};
    for (var i=0; i < this.state.projects.length; i++) {
      if (this.state.projects[i].name === e.target.value) {
        projectSelected = this.state.projects[i];        
      } 
    }
    this.setState({
      nameProject: e.target.value,
      project: projectSelected
    });
  }

  updateStatePeriodicity = (mesure) => {
    let periodicitySelected = {};
    for (var i=0; i < this.state.periodicities.length; i++) {
      if (this.state.periodicities[i].name === mesure) {
        periodicitySelected = this.state.periodicities[i];        
      } 
    }
    this.setState({
      periodicityName: mesure,
      periodicity: periodicitySelected
    });    
  }

  updateStateValuePeriodicity = (mesure) => {
    if (null !== mesure) {
      this.setState({
        mess1M3: 'none'
      });
    }
    this.setState({valuePeriodicity: mesure});
  }

  updateStatePriority = (mesure) => {
    let prioritySelected = {};
    for (var i=0; i < this.state.priorities.length; i++) {
      if (this.state.priorities[i].name === mesure) {
        prioritySelected = this.state.priorities[i];        
      } 
    }
    this.setState({
      priorityName: mesure,
      priority: prioritySelected
    }); 
  }

  updateStateContactEvent = (e) =>{
    let contactSelected = {};
    let aContact = ''; 
    for (var i=0; i < this.state.contacts.length; i++) {
      aContact = this.state.contacts[i].first_name + ' ' + this.state.contacts[i].name
      if (null !== this.state.contacts[i].profession){
        aContact = aContact + ' (' + this.state.contacts[i].profession + ')'; 
      }
      if (aContact === e.target.value) {
        contactSelected = this.state.contacts[i];        
      } 
    }
    this.setState({
      contactEvent: e.target.value,
      contact: contactSelected
    });
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
        if (null != this.state.nameEvent && this.state.nameEvent.length > 1 && this.state.nameEvent.length < 45) {
          valid = true;
          this.setState({ mess1M1: 'none'});
          this.setState({ mess2M1: 'none'});
        }else{
          this.setState({ mess1M1: 'inline'});
        }   
        if (this.state.dateEvent !== '' && valid === true) {
          valid = true;
          this.setState({ mess2M1: 'none'});
        }else{
          valid = false;
          this.setState({ mess2M1: 'inline'});
        }
        if (valid === true){
          if ((this.state.hourEvent === 'x' && this.state.minuteEvent !== 'x') || 
              (this.state.hourEvent !== 'x' && this.state.minuteEvent === 'x')) {
            valid = false;
            console.log('hm ' + this.state.hourEvent + ':' + this.setState.minuteEvent);
            if (this.state.hourEvent === 'x') {
              this.setState({ mess3M1: 'inline'});
            }else{
              this.setState({ mess3M1: 'none'});
            }
            if (this.state.minuteEvent === 'x') {
              this.setState({ mess4M1: 'inline'});
            }else{
              this.setState({ mess4M1: 'none'});
            }
          }else{
            this.setState({ 
              mess1M1: 'none',
              mess2M1: 'none',
              mess3M1: 'none',
              mess4M1: 'none'
            });
          }
        }
        break;
      case 2: //Modal2
        if (this.state.nameMember.length > 0) {
          valid = true;
          this.setState({ mess1M2: 'none'});
        }else{
          this.setState({ mess1M2: 'inline'});
        }
        if (this.state.nameCategory.length > 0 && valid === true) {
          valid = true;
          this.setState({ mess2M2: 'none'});
        }else{
          valid = false;
          this.setState({ mess2M2: 'inline'});
        }
        break;
      case 3: //Modal3
        if ((this.state.periodicityName !== 'Aucune' && this.state.valuePeriodicity > 0) ||
            this.state.periodicityName === 'Aucune') {
          valid = true;
          this.setState({ mess1M3: true});
        }else{
          this.setState({ mess1M3: false});
        }
        break;
      case 4: //Modal4        
        valid = true;           
        break;
      case 5: //Modal5        
        valid = true;           
        break;
      default:
    }
    // valid = true;
    if (valid === true) {
      if (this.state.numero < this.state.nbModal) {
        e.preventDefault();
        var trouve=0;
        for (var i = 0; i < this.state.nbModal; i++){
          if (trouve === 1) { //si le component est trouvé le suivant est true
          //if (trouve === 1 && valid === 1) { //si le component est trouvé le suivant est true
              let tabTransfert = [];
              for (var j=1; j < this.state.nbModal; j++) {
                if (j === i) {
                  tabTransfert[j] = true;
                }else{
                tabTransfert[j] = this.state.showModal[j];
                }
              }              
              this.setState({
                numero: i + 1,
                showModal: tabTransfert
              });
              trouve = 0;
          }else{
              if (this.state.showModal[i] === true && trouve === 0) { //si le component n'est pas trouvé le component est false
                  this.state.showModal[i]= false;
                  trouve = 1;
              }
          }
        }
        
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
            this.setState({
              numero: i + 1
            });
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

  createEvent = () => {

    let newEvent = this.state.addedEvent;
    
    newEvent.name = this.state.prefixe + this.state.nameEvent;
    newEvent.done = false;
    newEvent.comment = this.state.commentEvent;
    newEvent.periodicityValue = this.state.valuePeriodicity;
    newEvent.periodicity = this.state.periodicity;
    newEvent.priority = this.state.priority;
    newEvent.user = this.state.member;
    newEvent.category = this.state.category;
    newEvent.project = this.state.project;
    newEvent.family = this.props.family;
    newEvent.contact = this.state.contact;
    newEvent.hasChild = false;
    newEvent.estimatedBudget = this.state.budgetEvent;

    let hours, minutes, timeRDV;
    if (this.state.hourEvent === 'x' && this.state.minuteEvent === 'x') {
      timeRDV = '00:00:11';
    }else{
      if (this.state.hourEvent - 1 < 10){
        hours = '0' + this.state.hourEvent - 1;
      }else{
        hours = this.state.hourEvent - 1;
      }
      if ((this.state.minuteEvent - 1) * 5 < 10){
        minutes = '0' + (this.state.minuteEvent - 1) * 5;
      }else{
        minutes = (this.state.minuteEvent - 1) * 5;
      }
      timeRDV = hours + ':' + minutes + ':00';
    }         

    newEvent.deadline = this.state.dateEvent.format('YYYY-MM-DD') + 'T' + timeRDV;    
    this.setState({
      addedEvent: newEvent,
      messClose: true
  });
  
    axios.post('/api/events', this.state.addedEvent)
      .then((response) => {
        this.setState({ messM5: false});
        // this.timeout = setTimeout(() => {
        //   this.setState({ messM5: false});
        // }, 2500);
        // this.close(); 
        this.props.rload();
      })
      .catch((err) => {
        console.log('Failed to create Event : ', err);
    })
  }

  render() {
    const { open, dimmer, closeOnEscape, closeOnRootNodeClick  } = this.state;

    return (
      <div>
        Les événements
        <Popup trigger={<Icon link name='plus' size='large' onClick={this.show(true)}/>}>
          <Popup.Header>Créer un événement</Popup.Header>
          <Popup.Content>
            En cliquant sur ce bouton, vous créez un nouvel événement pour un membre de votre famille.
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
              Ajouter un nouvel événement {this.state.numero}/{this.state.nbModal}
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
                  myHour={this.state.hourEvent}
                  updateStateHourEventProp={this.updateStateHourEvent}
                  myMinute={this.state.minuteEvent}
                  updateStateMinuteEventProp={this.updateStateMinuteEvent}
                  aMess1M1={this.state.mess1M1}
                  aMess2M1={this.state.mess2M1}
                  aMess3M1={this.state.mess3M1}
                  aMess4M1={this.state.mess4M1}
                />}
                {this.state.showModal[1] && < Modal2 
                  myNameMember={this.state.nameMember} 
                  updateStateNameMemberProp={this.updateStateNameMember}
                  myNameCategory={this.state.nameCategory} 
                  updateStateNameCategoryProp={this.updateStateNameCategory} 
                  myNameProject={this.state.nameProject} 
                  updateStateNameProjectProp={this.updateStateNameProject}
                  theMembers={this.state.members}
                  theCategories={this.state.categories}
                  theProjects={this.state.projects}
                  aMess1M2={this.state.mess1M2}
                  aMess2M2={this.state.mess2M2}
                />}
                {this.state.showModal[2] && < Modal3 
                  myPriority={this.state.priorityName}
                  updateStatePriorityProp={this.updateStatePriority}
                  myPeriodicity={this.state.periodicityName}
                  updateStatePeriodicityProp={this.updateStatePeriodicity}
                  myValuePeriodicity={this.state.valuePeriodicity}
                  updateStateValuePeriodicityProp={this.updateStateValuePeriodicity}    
                  thePeriodicities={this.state.periodicities}
                  thePriorities={this.state.priorities} 
                  aMess1M3={this.state.mess1M3}     
                />}
                {this.state.showModal[3] && < Modal4 
                  myContactEvent={this.state.contactEvent}
                  updateStateContactEventProp={this.updateStateContactEvent}               
                  theContacts={this.state.contacts}
                  family={this.props.family}
                  reloadContacts={this.reloadContacts}
                />}
                {this.state.showModal[4] && < Modal5 
                  myBudgetEvent={this.state.budgetEvent}
                  updateStateBudgetEventProp={this.updateStateBudgetEvent}
                  myCommentEvent={this.state.commentEvent}
                  updateStateCommentEventProp={this.updateStateCommentEvent}     
                  aMessM5={this.state.messM5}             
                />}
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              {(this.state.numero > 1 && this.state.messClose === false) && <Button content='Précédent' icon='left chevron' labelPosition='left' onClick={this.onClickPrevious.bind(this)} />}
              {(this.state.numero === 1 && this.state.messClose === false) && <Button disabled content='Précédent' icon='left chevron' labelPosition='left' onClick={this.onClickPrevious.bind(this)} />}
              {this.state.messClose === false && <Button color='orange' onClick={this.close}>
                Annuler
              </Button>}
              {(this.state.numero < 5 && this.state.messClose === false) && <Button positive icon='right chevron' labelPosition='right' content='Suivant' onClick={this.onClickNext.bind(this)} />}
              {(this.state.numero === 5 && this.state.messClose === false) && <Button positive icon='checkmark' labelPosition='right' content='Valider' onClick={this.createEvent} />}
              {this.state.messClose === true && <Button color='green' onClick={this.close}>
                Fermer
              </Button>}
            </Modal.Actions>         
        </Modal>        
      </div>
    )
  }
}

export default ModalNewEvent

 