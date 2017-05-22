import React, {Component} from 'react';
import {Form, Label, Message} from 'semantic-ui-react';

export default class Priority extends Component {

  render() {
    return (
      <div>
        <Form.Group inline>
          <Label circular color='orange'>{this.props.id}</Label>
          <Form.Input placeholder='Nom' value={this.props.name}  onChange={(evt)=>this.props.change(evt, this.props.id)} />
            <Form.Button type="button" onClick={()=>this.props.edit(this.props.id, this.props.name)}>Éditer</Form.Button>
        </Form.Group>
        <Message error content={this.props.msgError} />
      </div>
    )
  }

}
