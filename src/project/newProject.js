import React, {Component} from 'react';
import { Popup, Button, Input, Modal, Icon } from 'semantic-ui-react'
import '../Accueil/olga.css';

class ModalNewProject extends Component {
  state = { open: false }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    return (
      <div className='ribbonOrange'>
        Les projets
        <Popup trigger={<Icon link size='large' name='plus' onClick={this.show(true)}/>}>
        {/*<Popup trigger={<Button color='orange' onClick={this.show(false)}>None</Button>}>*/}
          <Popup.Header>Ajouter un nouveau projet</Popup.Header>
          <Popup.Content>
            En cliquant sur ce bouton, vous ajoutez un nouveau projet.
          </Popup.Content>
        </Popup>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Ajouter un nouveau projet</Modal.Header>
          <Modal.Content>
           
            <Modal.Description>
              <Input label='Nom' placeholder="nom du projet" />
              
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='orange' onClick={this.close}>
              Annuler
            </Button>
            <Button positive onClick={this.close} >
                Valider
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default ModalNewProject

 