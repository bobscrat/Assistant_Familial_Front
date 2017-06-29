import React, {Component} from 'react';
import {Grid, Input, Icon, Image, Modal, Button} from 'semantic-ui-react';



class ModalAvatarMember extends Component {



  render() {

    return (

<Grid.Row>
  <Grid.Column>
    <Image src={require('../images/avatars/32x32/'+ (this.props.name))}/>
    {this.props.type}<br />
  </Grid.Column>
  </Grid.Row>

    )
  }
}
export default ModalAvatarMember;
