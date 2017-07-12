import React, {Component} from 'react';
import axios from 'axios';
import {Grid, Input, Icon, Image, Label, Popup, Modal, List, Button} from 'semantic-ui-react';
import avatar from './avatars.json';
import ModalAvatar from './ModalAvatarMember.js';

import {updateMember} from './libMember.js';

class EditMemberInput extends Component {
  state = {
    open: false,
    avatars: avatar.images,
    image: this.props.image,
    member: this.props.name
  }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })


tiClick = (newImage) => {
  this.setState({image: newImage})  
  this.props.imageChange(newImage, this.props.index);

  }


  render() {
    const { open } = this.state;

    return (
      <div>
      <Grid columns={3}>
          <Grid.Row>
              <Grid.Column width={4}>
                <Popup trigger={<Image onClick={this.show(true)} src={require('../images/avatars/32x32/'+ (this.state.image))}/>}>
                  <Popup.Header>Modifier l'avatar</Popup.Header>
                  <Popup.Content>
                      En cliquant sur ce bouton, vous modifiez l'avatar des membres de votre famille.
                  </Popup.Content>
                </Popup>
                    
                </Grid.Column>
                <Grid.Column width={12}>
                    <Input 
                    value={this.props.name} onChange={(evt) => this.props.change(evt, this.props.index)} />
                </Grid.Column>
            </Grid.Row>
      </Grid>
      
      <Modal dimmer open={open} onClose={this.close}>
        <Modal.Header>
          Liste des avatars
          </Modal.Header>
        <Modal.Content>
          <Grid columns={5}>
            {this.state.avatars.map(
              (avatar, i) => 
              <Grid.Column key={i}>
                <ModalAvatar  name={avatar.name} type={avatar.type} index={this.props.index} change={this.tiClick}/>
              </Grid.Column>
            )}
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button content='Quitter' color='orange' onClick={this.close}/>
          <Button positive content='Valider' onClick={ () => this.props.imageChange(this.state.image, this.props.index)} onClick={this.close}/>
        </Modal.Actions>
      </Modal>
      </div>
    )
  }
}
export default EditMemberInput;
