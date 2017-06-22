// Olga
import React, {Component} from 'react';
import {Grid, Input, Icon} from 'semantic-ui-react';

class ModalEditProjectInput extends Component {

  render() {
    return (
      <Grid.Column>
        <Input 
          icon={<Icon name='folder' color='orange' />}
          iconPosition='left'          
          value={this.props.name} 
          onChange={(evt) => this.props.change(evt, this.props.index)} />
      </Grid.Column>
    )
  }
}
export default ModalEditProjectInput;
