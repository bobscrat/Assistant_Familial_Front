import React, {Component} from 'react';
import { Popup, Button, Modal, Icon, Label, Form, Input } from 'semantic-ui-react';
import axios from 'axios';
import './profil.css';

class ModalEditProfil extends Component {

  constructor(props) {
    super(props);
    this.state = {            
      open : false,      
      profil: {},            
      mess1: 'none',
      mess2: 'none',
      mess3: 'none',
      messClose: false
    } 
  };

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

  closeConfigShow = (closeOnEscape, closeOnRootNodeClick) => () => {
    this.setState({ closeOnEscape, closeOnRootNodeClick, open: true })
  }

  show = (dimmer) => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  createEvent = () => {

    let newEvent = this.state.addedEvent;
    
    newEvent.name = this.state.prefixe + this.state.nameEvent;
    newEvent.done = false;
    newEvent.comment = this.state.commentEvent;
    newEvent.periodicityValue = this.state.valuePeriodicity;
    newEvent.periodicity = this.state.periodicity;
    

      
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
        <Popup trigger={<Label 
          as='a' 
          basic 
          className='profil'
          onClick={this.show(true)} >
            <Icon name='pencil' />
            mon profil
          </Label>
        }>
          <Popup.Header>Modifier mes données personnelles</Popup.Header>
          <Popup.Content>
            En cliquant sur ce bouton, vous pouvez modifier vos données personnelles.
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
              Modifier mes données personnelles
            </Modal.Header>

            <Modal.Content>            
              <Modal.Description>
                <Form>
                  <Form.Group widths='equal' >
                    <Form.Field>
                      <label>Votre prénom<span className='fieldRequired'> *   </span><span style={{display: this.state.mess1, color: 'red'}}>Saisir un prénom de 2 à 45 caractères</span></label>                                           
                      <Popup
                          trigger={ <Input 
                              fluid                                         
                              name="firstName" 
                              value={this.props.myProfil.firstName} 
                              placeholder="votre prénom" 
                              onChange={this.props.updateStateNameEventProp} 
                          />}
                          header="Votre prénom"
                          content="Vous devez saisir un prénom de 2 à 45 caractères"
                          on='focus'
                      />                                                          
                    </Form.Field>
                    <Form.Field>
                      <label>Votre date de naissance<span className='fieldRequired'> *   </span><span style={{display: this.state.mess2, color: 'red'}}>Vous devez saisir votre date de naissance au format jj/mm/aaaa</span></label>                                           
                      <Popup
                          trigger={ <Input 
                              fluid                                         
                              name="birthday" 
                              value={this.props.myProfil.birthday} 
                              placeholder="votre date de naissance" 
                              onChange={this.props.updateStateNameEventProp} 
                          />}
                          header="Votre date de naissance"
                          content="Vous devez saisir votre date de naissance au format jj/mm/aaaa"
                          on='focus'
                      />                                                          
                    </Form.Field>
                  </Form.Group>
                  <Form.Group widths='equal' >
                    <Form.Field>
                      <label>Votre adresse email<span className='fieldRequired'> *   </span><span style={{display: this.state.mess1, color: 'red'}}>Saisir un prénom de 2 à 45 caractères</span></label>                                           
                      <Popup
                          trigger={ <Input 
                              fluid                                         
                              name="firstName" 
                              value={this.props.myProfil.email} 
                              placeholder="votre prénom" 
                              onChange={this.props.updateStateNameEventProp} 
                          />}
                          header="Votre prénom"
                          content="Vous devez saisir un prénom de 2 à 45 caractères"
                          on='focus'
                      />                                                          
                    </Form.Field>
                    <Form.Field>
                      <label>Votre mot de passe<span className='fieldRequired'> *   </span><span style={{display: this.state.mess2, color: 'red'}}>Vous devez saisir votre date de naissance au format jj/mm/aaaa</span></label>                                           
                      <Popup
                          trigger={ <Input 
                              fluid                                         
                              name="birthday" 
                              type='password'
                              value={this.props.myProfil.password} 
                              placeholder="votre date de naissance" 
                              onChange={this.props.updateStateNameEventProp} 
                          />}
                          header="Votre date de naissance"
                          content="Vous devez saisir votre date de naissance au format jj/mm/aaaa"
                          on='focus'
                      />                                                          
                    </Form.Field>
                  </Form.Group>
                </Form>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              {this.state.messClose === false && <Button color='orange' onClick={this.close}>
                Annuler
              </Button>}
              {this.state.messClose === false && <Button positive icon='checkmark' labelPosition='right' content='Valider' onClick={this.createEvent} />}
              {this.state.messClose === true && <Button color='green' onClick={this.close}>
                Fermer
              </Button>}
            </Modal.Actions>         
        </Modal>        
      </div>
    )
  }
}

export default ModalEditProfil

 