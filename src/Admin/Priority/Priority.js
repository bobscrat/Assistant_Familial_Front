import React, {Component} from 'react';
import {Form, Label} from 'semantic-ui-react';

export default class Priority extends Component {

  render() {
    return (
      <Form.Group inline>
        <Label circular color='orange'>{this.props.id}</Label>
        <Form.Input placeholder='Nom' value={this.props.name} onChange={(evt) => this.props.change(evt, this.props.id)}/>
        <Form.Button type="button" onClick={() => this.props.edit(this.props.id, this.props.name)}>Éditer</Form.Button>
      </Form.Group>
    )
  }

}
