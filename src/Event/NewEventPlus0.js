import React, {Component} from 'react';
import { Popup, Button, Input, Modal, Icon, Label, Form, Divider, Grid } from 'semantic-ui-react'

import'./event.css'
import ModalNewEvent1 from './NewEventPlus1.js';

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
          <Popup.Header>Créer un évènement</Popup.Header>
          <Popup.Content>
            En cliquant sur ce bouton, vous créez un nouvel évènement pour un membre de votre famille.
          </Popup.Content>
        </Popup>

        <Modal dimmer={dimmer} open={open} onClose={this.close} closeIcon='close'>
          
            <Modal.Header>Ajouter un nouvel évènement (1/7)</Modal.Header>
            <Modal.Content>
            
              <Modal.Description>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={3}>
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Form.Group>
                        <Label>
                          <Icon name='toggle on' color='green' />
                          Prise de RDV
                        </Label>
                        <Label>
                          <Icon name='toggle off' />
                          RDV ou tâche
                        </Label>
                      </Form.Group>
                      <Divider hidden />  
                      <Form.Group>
                        <Form.Field required>
                          <label>Nom de l'évènement</label>
                          <Input fluid placeholder="nom de l'évènement" />
                        </Form.Field>
                        <Divider hidden />
                        <Form.Field required>
                          <label>Date de l'évènement</label>
                          <Input fluid placeholder="date de l'évènement" />
                        </Form.Field>
                      </Form.Group>
                    </Grid.Column>
                    <Grid.Column width={3}>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>                 
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button disabled content='Précédent' icon='left chevron' labelPosition='left' onClick={this.close} />
              <Button color='orange' onClick={this.close}>
                Annuler
              </Button>
              <ModalNewEvent1 onClick={this.close} />
            </Modal.Actions>
         
        </Modal>
        
      </div>
    )
  }
}

export default ModalNewEvent

 