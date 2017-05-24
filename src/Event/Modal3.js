import React, {Component} from 'react';
import { Popup, Button, Input, Modal, Icon, Label, Form, Divider, Grid } from 'semantic-ui-react';

import'./event.css';

class Modal1 extends Component {
  state = { open: false };

  show = (dimmer) => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open, dimmer } = this.state;

    return (
      <div>        
        <Grid>
            <Grid.Row>
            <Grid.Column width={3}>
            </Grid.Column>
            <Grid.Column width={10}>
                Les membres
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
      </div>
    )
  }
}

export default Modal1

 