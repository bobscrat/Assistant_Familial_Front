import React, {Component} from 'react';
import { Popup, Button, Input, Modal, Icon } from 'semantic-ui-react'
import '../Home/olga.css';

class ModalEditMember extends Component {
  state = { open: false }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    return (
      <div className='ribbonOrange'>
        
        <Popup trigger={<Icon link size='large' name='pencil' onClick={this.show(true)}/>}>
        {/*<Popup trigger={<Button color='orange' onClick={this.show(false)}>None</Button>}>*/}
          <Popup.Header>Modifier les membres</Popup.Header>
          <Popup.Content>
            En cliquant sur ce bouton, vous modifiez les membres de votre famille.
          </Popup.Content>
        </Popup>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Modifier ce membre</Modal.Header>
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

export default ModalEditMember

 