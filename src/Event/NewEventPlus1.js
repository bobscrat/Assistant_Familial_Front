import React, {Component} from 'react';
import { Popup, Button, Input, Modal, Icon, Label, Form, Divider, Grid } from 'semantic-ui-react'

import'./event.css'
import ModalNewEvent2 from './NewEventPlus2.js';

class ModalNewEvent extends Component {
  state = { open: false }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    return (
      <div className='buttonSuivant'>
        <Button positive content='Suivant' icon='right chevron' labelPosition='right' onClick={this.show(true)} />

        <Modal dimmer={dimmer} open={open} onClose={this.close} closeIcon='close'>
          
            <Modal.Header>Ajouter un nouvel évènement (2/7)</Modal.Header>
            <Modal.Content>
            
              <Modal.Description>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={3}>
                    </Grid.Column>
                    <Grid.Column width={10}>
                      Les catégories 
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
              <Button content='Précédent' icon='left chevron' labelPosition='left' onClick={this.close} />
              <Button color='orange' onClick={this.close}>
                Annuler
              </Button>
              <ModalNewEvent2 />
            </Modal.Actions>
         
        </Modal>
        
      </div>
    )
  }
}

export default ModalNewEvent

 