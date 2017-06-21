import React, {Component} from 'react';
import { Button, Input, Modal, Form, Segment } from 'semantic-ui-react';
import css from './Login.css';


class ForgetPassword extends Component{
  state = { open: false }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    return (
      <div className='pass'>
        <Segment className='segment' onClick={this.show(true)}>Mot de passe oublié ?</Segment>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Modifier votre mot de passe</Modal.Header>
          <Modal.Content>           
            <Modal.Description>
                <Form>
                    <Form.Input label="Nom de votre famille" type="text" name="name" />
                    <Form.Input label="Adresse e-mail" type="email" name="email" />
                    <Form.Input label="Nouveau Mot de passe" type="password" name="password"/>
                    <Form.Input label="Confirmation nouveau Mot de passe" type="password" name="password"/>
                </Form>
              
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

export default ForgetPassword;