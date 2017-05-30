import React, {Component} from 'react';
import { Popup, Button, Modal, Icon} from 'semantic-ui-react';

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
            nameEvent: '',
            dateEvent: '',
            nameUser: '',
            nameCategory: '',
            nameProject: '',
            budgetEvent: '',
            commentEvent: ''
         }  

         this.updateStateNameEvent = this.updateStateNameEvent.bind(this);
         this.updateStateDateEvent = this.updateStateDateEvent.bind(this);
         this.updateStateNameUser = this.updateStateNameUser.bind(this);
         this.updateStateNameCategory = this.updateStateNameCategory.bind(this);
         this.updateStateNameProject = this.updateStateNameProject.bind(this);

         this.updateStateBudget = this.updateStateBudget.bind(this);
         this.updateStateComment = this.updateStateComment.bind(this);
    };

  updateStateNameEvent(e) {
        this.setState({nameEvent: e.target.value});
    }
  updateStateDateEvent(e) {
        this.setState({dateEvent: e.target.value});
    }
  updateStateNameUser(e) {
      this.setState({nameUser: e.target.value});
  }
  updateStateNameCategory(e) {
        this.setState({nameCategory: e.target.value});
    }
  updateStateNameProject(e) {
        this.setState({nameProject: e.target.value});
    }

  updateStateBudget(e) {
      this.setState({budgetEvent: e.target.value});
  }
  updateStateComment(e) {
      this.setState({commentEvent: e.target.value});
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
        console.log('name = ' + this.state.nameEvent);
        console.log('date = ' + this.state.dateEvent);
        console.log('user = ' + this.state.nameUser);
        console.log('category = ' + this.state.nameCategory);
        console.log('project = ' + this.state.nameProject);

        console.log('budget = ' + this.state.budgetEvent);
        console.log('comment = ' + this.state.commentEvent);
        this.setState({})
      }
    }
  }    

  onClickPrevious(e){
    if (this.state.numero > 1) {
      e.preventDefault();
      var trouve=0;
      for (var i = this.state.nbModal; i >= 0; i=i-1){
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

  render() {
    const { open, dimmer } = this.state;

    return (
      <div>
        Les évènements
        <Popup trigger={<Icon link name='plus' size='large' onClick={this.show(true)}/>}>
          <Popup.Header>Créer un évènement</Popup.Header>
          <Popup.Content>
            En cliquant sur ce bouton, vous créez un nouvel évènement pour un membre de votre famille.
          </Popup.Content>
        </Popup>
        <Modal dimmer={dimmer} open={open} onClose={this.close} closeIcon='close'>          
            <Modal.Header>Ajouter un nouvel évènement {this.state.numero}/{this.state.nbModal}</Modal.Header>
            <Modal.Content>            
              <Modal.Description>
                {this.state.showModal[0] && < Modal1 
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
                {this.state.showModal[2] && < Modal3 />}
                {this.state.showModal[3] && < Modal4 />}
                {this.state.showModal[4] && < Modal5 
                  myBudget={this.state.budgetEvent}
                  updateStateBudgetProp={this.updateStateBudget}
                  myComment={this.state.commentEvent}
                  updateStateCommentProp={this.updateStateComment}
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
              {this.state.numero === 5 && <Button positive icon='checkmark' labelPosition='right' content='Valider' onClick={this.onClickNext.bind(this)} />}

            </Modal.Actions>         
        </Modal>        
      </div>
    )
  }
}

export default ModalNewEvent

 