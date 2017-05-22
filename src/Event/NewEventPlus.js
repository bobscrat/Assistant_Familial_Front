import React, {Component} from 'react';
import { Popup, Button, Input, Modal, Icon } from 'semantic-ui-react'
import '../Accueil/olga.css';

class ModalNewEvent extends Component {
  state = { open: false }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    return (
      <div>
        Les évènements
        <Popup trigger={<Icon link name='plus' size='large' onClick={this.show(true)}/>}>
        {/*<Popup trigger={<Button color='orange' onClick={this.show(false)}>None</Button>}>*/}
          <Popup.Header>Créer un évènement</Popup.Header>
          <Popup.Content>
            En cliquant sur ce bouton, vous créez un nouvel évènement pour un membre de votre famille.
          </Popup.Content>
        </Popup>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Ajouter un évènement</Modal.Header>
          <Modal.Content>
           
            <Modal.Description>
              <Input label='RDV' placeholder="nom de l'évènement" />
              <Input label='Date' placeholder="date de l'évènement" />
              
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
      </div>
    )
  }
}

export default ModalNewEvent

 