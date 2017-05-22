import React, {Component} from 'react';
import { Popup, Button, Modal, Icon } from 'semantic-ui-react'
import '../Accueil/olga.css';

class ModalValidEvent extends Component {
  state = { open: false }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    return (
      <div>
        
        <Popup trigger={<Icon link color='green' size='large' name='checkmark' onClick={this.show(true)}/>}>
        {/*<Popup trigger={<Button color='orange' onClick={this.show(false)}>None</Button>}>*/}
          <Popup.Header>Clôturer cet évènement</Popup.Header>
          <Popup.Content>
            En cliquant sur ce bouton, vous clôturez cet évènement.
          </Popup.Content>
        </Popup>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Clôturer cet évènement</Modal.Header>
          <Modal.Content>
           
            <Modal.Description>
              Clôturer l'évènement
              
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
             
            <Button color='orange' onClick={this.close}>Annuler</Button>
            
            <Button positive content='Valider' onClick={this.close} />
                
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default ModalValidEvent

 