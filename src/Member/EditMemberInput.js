import React, {Component} from 'react';
import {Grid, Input, Icon, Image, Label} from 'semantic-ui-react';
import { CirclePicker} from 'react-color';
import ToggleDisplay from 'react-toggle-display';

import ModalAvatar from './ModalAvatarMember.js';
class EditMemberInput extends Component {


// affichage ou non du colorPicker
    handleClick = () => {
      console.log("coucou");
      <ModalAvatar/>
    }



  render() {
    return (
      <Grid columns={3}>
          <Grid.Row>
              <Grid.Column width={4}>
                    <Image src={require('../images/avatars/32x32/'+ (this.props.image))} as='a' onClick={this.handleClick} />
                    <Label
            as='a'
            basic
            size='large'
            className='nameMember'
            onClick={this.handleClick}
        >
            {this.props.name}
        </Label>
                <ModalAvatar
                     
                />
                </Grid.Column>
                <Grid.Column width={12}>
                    <Input 
                    value={this.props.name} onChange={(evt) => this.props.change(evt, this.props.index)} />
                </Grid.Column>
            </Grid.Row>
      </Grid>
    )
  }
}
export default EditMemberInput;
