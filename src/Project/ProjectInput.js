import React, {Component} from 'react';
import {Form, Input, Label} from 'semantic-ui-react';

class ProjectInput extends Component {

  render() {
    return (
      <Form.Field>
        <Label circular color='orange'>{this.props.id}</Label>
        <Input placeholder='Nom du projet' value={this.props.name} onChange={(evt) => this.props.change(evt, this.props.id)} />
      </Form.Field>
    )
  }
}
export default ProjectInput;
