// Olga
import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';
import axios from 'axios';

class PriorityForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: ''
    };
  }

  createPriority = (priority) => {
    const componentInstance = this;
    axios.post('/api/priorities', priority).then((response) => {
      if (null != response.data.msgError) {
        componentInstance.setState({msgError: response.data.msgError, priority: null, msgSuccess: null});
      }
      else {
        componentInstance.setState({priority: response.data, msgSuccess: "Succès", msgError: null});
      }
    }).catch((err) => {
      console.log('Failed to create priority : ', err);
    })
  }

  updatePriority = (priority) => {
    const componentInstance = this;
    axios.put('/api/priorities', priority).then((response) => {
      if (null != response.data.msgError) {
        componentInstance.setState({msgError: response.data.msgError, priority: null, msgSuccess: null});
      }
      else {
        componentInstance.setState({priority: response.data, msgSuccess: "Succès", msgError: null});
      }
    }).catch((err) => {
      console.log('Failed to update priority : ', err);
    })
  }

  // sinon, la valeur du champ revient à '' chaque fois qu'on tape une lettre
  handleChange = (evt) => {
    const inputName = evt.target.name;
    const inputValue = evt.target.value;
    this.setState({
      [inputName]: inputValue
    });
  }

  // handleChange = (e, {name, value}) => this.setState({[name]: value});

  handleSubmit = (evt) => {
    evt.preventDefault();
    // pour mettre à jour le state avec les toutes dernières valeurs des champs
    // sinon le dernier caractère tapé ne sera pas pris en compte
    const inputName = evt.target.name;
    const inputValue = evt.target.value;
    this.setState({
      [inputName]: inputValue
    });
    // console.log('Priority = { id: ' + this.state.id + ', name: ' + this.state.name + '}');
    if ('' === this.state.id) {
      this.createPriority({name: this.state.name});
      // console.log('post');
    } else {
      // console.log('put');
      this.updatePriority({id: this.state.id, name: this.state.name});
    }

  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input name='id' label='Id' placeholder='Id' value={this.state.id} onChange={this.handleChange} />
        <Form.Input name='name' label='Nom' placeholder='Nom' value={this.state.name}  onChange={this.handleChange} />
        <Form.Button type='Submit'>Enregistrer</Form.Button>
      </Form>
    )
  }

}

export default PriorityForm;
