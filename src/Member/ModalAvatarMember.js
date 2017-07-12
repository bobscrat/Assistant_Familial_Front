import React, {Component} from 'react';
import {Grid, Image, Popup} from 'semantic-ui-react';
import axios from 'axios';
import {updateMember} from './libMember.js';

class ModalAvatarMember extends Component {

  state={
    monImage: this.props.name
  }

  clique = () => {
    this.props.change(this.state.monImage);
  }
  

  render() {
    return (
    
    <Grid.Row>
      <Grid.Column>
        <Popup trigger={<Image src={require('../images/avatars/32x32/'+ (this.props.name))} onClick={this.clique}/> } >
                  <Popup.Header>Modifier l'avatar</Popup.Header>
                  <Popup.Content>
                     Cliquez sur l'image souhaitée puis sur le bouton Valider
                  </Popup.Content>
                </Popup>
        
        {this.props.type}<br />
      </Grid.Column>
      </Grid.Row>

    )
  }
}
export default ModalAvatarMember;