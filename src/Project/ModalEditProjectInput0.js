// Olga
import React, {Component} from 'react';
import {Grid, Input} from 'semantic-ui-react';

class ModalEditProjectInput extends Component {

  render() {
    return (
      <Grid.Column>
        <Input label={{ basic: true, content: this.props.id, color:this.props.catcolor }}
    labelPosition='left' value={this.props.name} onChange={(evt) => this.props.change(evt, this.props.index)} />
      </Grid.Column>
    )
  }
}
export default ModalEditProjectInput;
