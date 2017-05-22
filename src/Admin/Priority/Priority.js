import React, {Component} from 'react';
import {Form, Label, Message} from 'semantic-ui-react';
import axios from 'axios';

export default class Priority extends Component {

  handleChange = (evt) => {
    const inputName = evt.target.name;
    const inputValue = evt.target.value;
    this.setState({
      [inputName]: inputValue
    });
  }

  transferEdit = () => {
    this.props.edit(this.props.id, this.props.name);
  }

  transferDesactivate = () => {
    this.props.desactiv(this.props.id);
  }

  render() {
    return (
      <div>
        <Form.Group inline>
          <Label circular color='orange'>{this.props.id}</Label>
          <Form.Input placeholder='Nom' value={this.props.name}  onChange={()=>this.props.change(this.props.id)} />
            <Form.Button type="button" onClick={()=>this.props.edit(this.props.id, this.props.name)}>Éditer</Form.Button>
        </Form.Group>
        <Message error content={this.props.msgError} />
      </div>
    )
  }

}
