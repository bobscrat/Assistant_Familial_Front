import React, {Component} from 'react';
import { Popup, Button, Input, Modal, Icon } from 'semantic-ui-react';

class ForgetPassword extends Component{
    state = { open: false }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    return (
        <div>
            <div onClick={this.show(true)}>Mot de passe oublié?</div>
            
            <Modal dimmer={dimmer} open={open} onClose={this.close}>
                <Modal.Header>Modifiez votre mot de passe</Modal.Header>
            </Modal>
        </div>
    )
  }
}

export default ForgetPassword;