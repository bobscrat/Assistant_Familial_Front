import React, {Component} from 'react';
import { Popup, Button, Input, Modal, Icon } from 'semantic-ui-react'
import '../Home/olga.css';

class ModalEditCategory extends Component {
  state = { open: false }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    return (
      <div className='ribbonOrange'>
        
        <Popup trigger={<Icon link size='large' name='pencil' onClick={this.show(true)}/>}>
        {/*<Popup trigger={<Button color='orange' onClick={this.show(false)}>None</Button>}>*/}
          <Popup.Header>Modifier les catégories</Popup.Header>
          <Popup.Content>
            En cliquant sur ce bouton, vous modifiez les catégories.
          </Popup.Content>
        </Popup>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Modifier le nom de la catégorie</Modal.Header>
          <Modal.Content>
           
            <Modal.Description>
              <Input label='Nom' placeholder="nom de la catégorie" />
              
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

export default ModalEditCategory

 