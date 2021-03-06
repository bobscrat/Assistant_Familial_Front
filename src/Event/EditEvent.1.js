import React, {Component} from 'react';
import { Popup, Button, Input, Modal, Icon } from 'semantic-ui-react'
import '../Home/olga.css';

class ModalEditEvent1 extends Component {
  state = { open: false }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    var compareDate = function (dateEvent) {
      return (dateEvent < new Date());     
    }

    return (
      <span>
        
        <Popup trigger={<a className={compareDate(event.convertedDate) ? 'fieldRequired' : '' } onClick={this.show(true)}>{this.props.myEvent.name}</a>}>
        {/*<Popup trigger={<Button color='orange' onClick={this.show(false)}>None</Button>}>*/}
          <Popup.Header>Modifier cet évènement</Popup.Header>
          <Popup.Content>
            En cliquant sur ce bouton, vous modifiez cet évènement.
          </Popup.Content>
        </Popup>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Modifier cet événement</Modal.Header>
          <Modal.Content>
           
            <Modal.Description>
              <Input 
                fluid                                         
                name="nameEvent" 
                value={this.props.myNameEvent} 
                placeholder="nom de l'événement" 
                onChange={this.props.updateStateNameEventProp} 
              />
              
              
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
             <Button disabled content='Précédent' icon='left chevron' labelPosition='left' onClick={this.close} />
            <Button color='orange' onClick={this.close}>
              Annuler
            </Button>
            <Button positive content='Suivant' icon='right chevron' labelPosition='right' onClick={this.close} />
          </Modal.Actions>
        </Modal>
      </span>
    )
  }
}

export default ModalEditEvent1

 