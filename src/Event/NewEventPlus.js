import React, {Component} from 'react';
import { Popup, Button, Input, Modal, Icon, Label, Form, Divider, Grid } from 'semantic-ui-react';

import'./event.css';
import Modal1 from './Modal1.js';
import Modal2 from './Modal2.js';
import Modal3 from './Modal3.js';
import Modal4 from './Modal4.js';

class ModalNewEvent extends Component {

  constructor(props) {
        super(props);
        this.state = {
            events: [],
            open : false,
            numero: 1,
            nbModal: 4,
            listModal: ['showModal1', 'showModal2', 'showModal3', 'showModal4'],
            showModal: [true, false, false, false]
         }  
    };



  show = (dimmer) => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  onClickNext(e){
    if (this.state.numero < this.state.nbModal) {
      e.preventDefault();
      var trouve=0;
      for (var i = 0; i < this.state.nbModal; i++){
        if (trouve === 1) { //si le component est trouvé le suivant est true
            this.state.showModal[i]= true;
            this.state.numero = i + 1;
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
            <Modal.Header>Ajouter un nouvel évènement {this.state.numero}/7</Modal.Header>
            <Modal.Content>            
              <Modal.Description>
                {this.state.showModal[0] && < Modal1 / >}
                {this.state.showModal[1] && < Modal2 / >}
                {this.state.showModal[2] && < Modal3 / >}
                {this.state.showModal[3] && < Modal4 / >}


              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button content='Précédent' icon='left chevron' labelPosition='left' onClick={this.onClickPrevious.bind(this)} />
              <Button color='orange' onClick={this.close}>
                Annuler
              </Button>
              <Button positive icon='right chevron' labelPosition='right' content='Suivant' onClick={this.onClickNext.bind(this)}/>
            </Modal.Actions>         
        </Modal>        
      </div>
    )
  }
}

export default ModalNewEvent

 