import React, {Component} from 'react';
import { Popup, Button, Input, Modal, Icon } from 'semantic-ui-react'
import '../accueil/olga.css';

class ModalNewMember extends Component {
  state = { open: false }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    return (
      <div className='ribbonOrange'>
        <Popup trigger={<Icon link size='large' name='plus' onClick={this.show(true)} />}>                
            <Popup.Header>Ajouter un nouveau membre</Popup.Header>
            <Popup.Content>
                En cliquant sur ce bouton, vous ajoutez un nouveau membre à votre famille.
            </Popup.Content>
        </Popup>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Ajouter un membre</Modal.Header>
          <Modal.Content>
           
            <Modal.Description>
              <Input label='Prénom' placeholder="prénom du membre" />
              <Input label='Date de naissance' placeholder="date de naissance du membre" />
              
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

export default ModalNewMember

 